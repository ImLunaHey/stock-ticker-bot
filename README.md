# stock-ticker-bot

A Bluesky bot. Mention it with a ticker symbol like `$AAPL` and it replies
with a generated SVG/PNG chart showing the current price, day's range,
open / prev-close markers, and basic profile info. Stock data comes from
[Finnhub](https://finnhub.io).

## Run it

```bash
npm install
BLUESKY_USERNAME=…  BLUESKY_PASSWORD=…  FINNHUB_API_KEY=…  npm start
```

## How it works

- `@skyware/bot` listens for mentions on the bot's account
- `extractTicker()` pulls a `$XXX` symbol out of the post text
- Finnhub is queried for the quote + company profile
- The chart is rendered as SVG, then rasterised to PNG via sharp
- The bot replies with the image attached and an alt-text summary

## Deploy

Configured for Railway (`railway.json`) — set the three env vars above as
secrets and it'll run as a long-lived worker.
