import { CurrencyUnit } from "./currency-unit";

export interface CurrencySupplier {
  getCurrency(): CurrencyUnit;
}