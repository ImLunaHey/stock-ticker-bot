export type StockQuote = {
  /**
   * Current price
   */
  c: number;
  /**
   * Price change
   */
  d: number;
  /**
   * Percent change
   */
  dp: number;
  /**
   * High price
   */
  h: number;
  /**
   * Low price
   */
  l: number;
  /**
   * Open price
   */
  o: number;
  /**
   * Previous close price
   */
  pc: number;
  /**
   * Timestamp
   */
  t: number;
};

export type StockProfile = {
  /**
   * Country
   */
  country: string;
  /**
   * Currency
   */
  currency: string;
  /**
   * Estimate currency
   */
  estimateCurrency: string;
  /**
   * Exchange
   */
  exchange: string;
  /**
   * Finnhub industry
   */
  finnhubIndustry: string;
  /**
   * IPO date
   */
  ipo: string;
  /**
   * Logo
   */
  logo: string;
  /**
   * Market capitalization
   */
  marketCapitalization: number;
  /**
   * Name
   */
  name: string;
  /**
   * Phone
   */
  phone: string;
  /**
   * Share outstanding
   */
  shareOutstanding: number;
  /**
   * Ticker
   */
  ticker: string;
  /**
   * Web URL
   */
  weburl: string;
};
