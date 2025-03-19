import 'dotenv/config';
import { writeFileSync } from 'fs';
import { makeImage } from './make-image';
import { getStock, getStockProfile, makeAltText, makeTickerImage } from './ticker';

const main = async () => {
  const ticker = 'DJT';
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

  console.info(stock);
  console.info(profile);

  const altText = makeAltText(profile, stock);
  const svg = makeTickerImage(profile, stock);
  const imageBuffer = await makeImage(svg);

  console.info(altText);
  writeFileSync(`./test.png`, imageBuffer);
};

main().catch(console.error);
