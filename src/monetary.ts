import { currencyCodes } from "./currency-codes";
import { CurrencyUnit } from "./currency-unit";

export class Monetary {
  static getCurrency(currencyCode: string, ...providers: string[]): CurrencyUnit {
    return {
      getCurrencyCode: () => currencyCode,
      getNumericCode: () => currencyCodes[currencyCode],
      getDefaultFractionDigits: () => 2,
      getContext: () => ({}),
    };
  }
}