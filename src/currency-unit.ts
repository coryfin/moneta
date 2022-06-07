import { MonetaryContext } from "./monetary-context";

export interface CurrencyUnit {
  getCurrencyCode(): string;
  getNumericCode(): string;
  getDefaultFractionDigits(): number;
  getContext(): MonetaryContext;
}