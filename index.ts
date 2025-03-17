import 'dotenv/config';
import { Bot } from '@skyware/bot';
import { makeImage } from './make-image';
import { AtpAgent } from '@atproto/api';
import { extractTicker, getStock, getStockProfile, makeAltText, makeTickerImage } from './ticker';

const username = process.env.BLUESKY_USERNAME;
const password = process.env.BLUESKY_PASSWORD;

if (!username || !password) throw new Error('BLUESKY_USERNAME and BLUESKY_PASSWORD must be set');

const main = async () => {
  const bot = new Bot();
  const agent = new AtpAgent({
    service: 'https://bsky.social',
  });

  const session = await bot.login({
    identifier: username,
    password: password,
  });

  await agent.resumeSession(session);

  bot.on('error', (error) => {
    console.error(`error: ${error}`);
  });

  console.info(`bot logged in as ${username}`);

  bot.on('mention', async (mention) => {
    const ticker = extractTicker(mention.text);
    if (!ticker) {
      mention.reply({
        text: `Hey @${mention.author.handle}, I couldn't find a valid ticker symbol in your message. Example: $AAPL`,
      });
      return;
    }

    const stock = await getStock(ticker);

    if (stock.d === null || stock.dp === null) {
      console.error(`Stock data is not available for ${ticker}`);
      return;
    }

    const profile = await getStockProfile(ticker);
    if (Object.keys(profile).length === 0) {
      console.error(`Stock profile is not available for ${ticker}`);
      return;
    }

    const altText = makeAltText(profile, stock);
    const svg = makeTickerImage(profile, stock);
    const imageBuffer = await makeImage(svg);

    const blob = new Blob([imageBuffer], { type: 'image/png' });

    await mention.reply({
      text: altText,
      images: [
        {
          alt: altText,
          data: blob,
        },
      ],
    });
  });
};

main().catch(console.error);
