import { CurrencyUnit } from "./currency-unit";
import { MonetaryAmount } from "./monetary-amount";

export function checkAmountParameter(amount: MonetaryAmount, currencyUnit: CurrencyUnit): void {
  if (!amount) {
    throw Error('Amount must not be null');
  }

  if (amount.getCurrency().getCurrencyCode() !== currencyUnit.getCurrencyCode()) {
    throw Error(`Currency mismatch: ${currencyUnit}/${amount.getCurrency()}`);
  }
}
