import { CurrencySupplier } from "./currency-supplier";
import { MonetaryContext } from "./monetary-context";
import { NumberSupplier } from "./number-supplier";

export interface MonetaryAmount extends CurrencySupplier, NumberSupplier {
  abs(): MonetaryAmount;
  add(amount: MonetaryAmount): MonetaryAmount;
  divide(divisor: number): MonetaryAmount;
  divideAndRemainder(divisor: number): [MonetaryAmount, MonetaryAmount];
  divideToIntegralValue(divisor: number): MonetaryAmount;
  getContext(): MonetaryContext | undefined;
  getFactory<T extends MonetaryAmount>(): MonetaryAmountFactory<T>;
  isEqualTo(amount: MonetaryAmount): boolean;
  isGreaterThan(amount: MonetaryAmount): boolean;
  isGreaterThanOrEqualTo(amount: MonetaryAmount): boolean;
  isLessThan(amount: MonetaryAmount): boolean;
  isLessThanOrEqualTo(amount: MonetaryAmount): boolean;
  isNegative(): boolean;
  isNegativeOrZero(): boolean;
  isPositive(): boolean;
  isPositiveOrZero(): boolean;
  isZero(): boolean;
  multiply(multiplicand: number): MonetaryAmount;
  negate(): MonetaryAmount;
  plus(): MonetaryAmount;
  query<R>(query: MonetaryQuery<R>): R;
  remainder(divisor: number): MonetaryAmount;
  scaleByPowerOfTen(power: number): MonetaryAmount;
  signum(): number;
  stripTrailingZeros(): MonetaryAmount;
  subtract(amount: MonetaryAmount): MonetaryAmount;
  with(operator: MonetaryOperator): MonetaryAmount;
}

export interface MonetaryAmountFactory<T extends MonetaryAmount> {}

export interface MonetaryQuery<R> {}

export interface MonetaryOperator {}