import { StockProfile, StockQuote } from './types';

const finnhubApiKey = process.env.FINNHUB_API_KEY;
if (!finnhubApiKey) throw new Error('FINNHUB_API_KEY is not set');

export const makeTickerImage = (profile: StockProfile, quote: StockQuote) => {
  const isNegative = quote.d < 0;
  const changeColor = isNegative ? '#ef4444' : '#22c55e';

  // Calculate dot positions based on actual prices
  const range = quote.h - quote.l;
  const openDotPosition = Math.max(30, Math.min(490, ((quote.o - quote.l) / range) * 520));
  const currentDotPosition = Math.max(30, Math.min(490, ((quote.c - quote.l) / range) * 520));
  const prevCloseDotPosition = Math.max(30, Math.min(490, ((quote.pc - quote.l) / range) * 520));

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 330">

      <!-- Background -->
      <rect width="600" height="320" fill="#1e293b" />
      
      <!-- Header section -->
      <g transform="translate(40, 50)">
        <!-- Stock Ticker -->
        <text x="0" y="0" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#f8fafc">${
          profile.ticker
        }</text>
        
        <!-- Stock Name - truncate if needed -->
        <text x="0" y="30" font-family="Arial, sans-serif" font-size="18" fill="#94a3b8">${
          profile.name.length > 25 ? profile.name.substring(0, 22) + '...' : profile.name
        }</text>
        
        <!-- Current Price - moved slightly right -->
        <text x="520" y="0" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#f8fafc" text-anchor="end">$${quote.c.toFixed(
          2,
        )}</text>
        
        <!-- Price Change - moved slightly right -->
        <text x="520" y="30" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="${changeColor}" text-anchor="end">${
    quote.d > 0 ? '+' : ''
  }${quote.d.toFixed(2)} (${quote.dp > 0 ? '+' : ''}${quote.dp.toFixed(2)}%)</text>
      </g>
      
      <!-- Divider -->
      <line x1="40" y1="100" x2="560" y2="100" stroke="#334155" strokeWidth="2" />
      
      <!-- Key metrics section -->
      <g transform="translate(40, 140)">
        <!-- Four key metrics in a row -->
        <g>
          <text x="0" y="0" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8">Previous Close</text>
          <text x="0" y="25" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#f8fafc">$${quote.pc.toFixed(
            2,
          )}</text>
        </g>
        
        <g transform="translate(130, 0)">
          <text x="0" y="0" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8">Open</text>
          <text x="0" y="25" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#f8fafc">$${quote.o.toFixed(
            2,
          )}</text>
        </g>
        
        <g transform="translate(260, 0)">
          <text x="0" y="0" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8">Day's High</text>
          <text x="0" y="25" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#f8fafc">$${quote.h.toFixed(
            2,
          )}</text>
        </g>
        
        <g transform="translate(390, 0)">
          <text x="0" y="0" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8">Day's Low</text>
          <text x="0" y="25" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#f8fafc">$${quote.l.toFixed(
            2,
          )}</text>
        </g>
      </g>
      
      <!-- Simple visual chart representation -->
      <g transform="translate(40, 200)">
        <!-- Range bar -->
        <rect x="0" y="10" width="520" height="8" rx="4" fill="#334155" />
        
        <!-- Dot markers with symbols instead of text -->
        <g>
          <circle cx="${openDotPosition}" cy="14" r="8" fill="#1e293b" stroke="#94a3b8" stroke-width="2" />
          <text x="${openDotPosition}" y="16" font-family="Arial, sans-serif" font-size="8" fill="#94a3b8" text-anchor="middle" dominant-baseline="middle">O</text>
        </g>
        
        <g>
          <circle cx="${currentDotPosition}" cy="14" r="10" fill="#1e293b" stroke="${changeColor}" stroke-width="2" />
          <text x="${currentDotPosition}" y="16" font-family="Arial, sans-serif" font-size="8" fill="${changeColor}" text-anchor="middle" dominant-baseline="middle">C</text>
        </g>
        
        <g>
          <circle cx="${prevCloseDotPosition}" cy="14" r="8" fill="#1e293b" stroke="#94a3b8" stroke-width="2" />
          <text x="${prevCloseDotPosition}" y="16" font-family="Arial, sans-serif" font-size="8" fill="#94a3b8" text-anchor="middle" dominant-baseline="middle">P</text>
        </g>
        
        <!-- Low price label -->
        <text x="10" y="40" font-family="Arial, sans-serif" font-size="13" fill="#94a3b8">$${quote.l.toFixed(2)}</text>
        
        <!-- High price label -->
        <text x="510" y="40" font-family="Arial, sans-serif" font-size="13" fill="#94a3b8" text-anchor="end">$${quote.h.toFixed(
          2,
        )}</text>
      </g>
      
      <!-- Legend at the bottom -->
      <g transform="translate(40, 270)">
        <rect width="520" height="30" rx="4" fill="#0f172a" />
        
        <!-- Legend items -->
        <g transform="translate(30, 15)">
          <circle cx="0" cy="0" r="8" fill="#1e293b" stroke="#94a3b8" stroke-width="2" />
          <text x="0" y="3" font-family="Arial, sans-serif" font-size="8" fill="#94a3b8" text-anchor="middle" dominant-baseline="middle">O</text>
          <text x="20" y="4" font-family="Arial, sans-serif" font-size="14" fill="#f8fafc" dominant-baseline="middle">Open</text>
        </g>
        
        <g transform="translate(120, 15)">
          <circle cx="0" cy="0" r="10" fill="#1e293b" stroke="${changeColor}" stroke-width="2" />
          <text x="0" y="3" font-family="Arial, sans-serif" font-size="8" fill="${changeColor}" text-anchor="middle" dominant-baseline="middle">C</text>
          <text x="20" y="4" font-family="Arial, sans-serif" font-size="14" fill="#f8fafc" dominant-baseline="middle">Current</text>
        </g>
        
        <g transform="translate(240, 15)">
          <circle cx="0" cy="0" r="8" fill="#1e293b" stroke="#94a3b8" stroke-width="2" />
          <text x="0" y="3" font-family="Arial, sans-serif" font-size="8" fill="#94a3b8" text-anchor="middle" dominant-baseline="middle">P</text>
          <text x="20" y="4" font-family="Arial, sans-serif" font-size="14" fill="#f8fafc" dominant-baseline="middle">Prev Close</text>
        </g>
      </g>
      
      <!-- Timestamp - moved to its own line -->
      <g transform="translate(300, 310)">
        <text x="0" y="2" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Data as of ${new Date(
          quote.t * 1000,
        ).toLocaleString()}</text>
      </g>
    </svg>
  `;
};

export const makeAltText = (stock: StockProfile, quote: StockQuote) =>
  `${stock.ticker} (${stock.name}) at ${quote.c.toFixed(2)}, ${quote.d > 0 ? 'up' : 'down'} ${Math.abs(quote.pc).toFixed(
    2,
  )} (${Math.abs(quote.dp).toFixed(2)}%). Open: ${quote.o.toFixed(2)}, Previous close: ${quote.pc.toFixed(
    2,
  )}, Day's range: ${quote.l.toFixed(2)} - ${quote.h.toFixed(2)}.`;

export const extractTicker = (mention: string) => {
  const ticker = mention.match(/\$\w+/);
  return ticker ? ticker[0].slice(1) : null;
};

export const getStock = async (ticker: string) => {
  const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${finnhubApiKey}`);
  return (await response.json()) as StockQuote;
};

export const getStockProfile = async (ticker: string) => {
  const response = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${finnhubApiKey}`);
  return (await response.json()) as StockProfile;
};
