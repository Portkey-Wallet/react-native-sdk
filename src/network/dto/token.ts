export interface TokenRriceItem {
  symbol: string;
  priceInUsd: number;
}

export interface TokenPriceResult {
  items: TokenRriceItem[];
  totalRecordCount: number;
}
