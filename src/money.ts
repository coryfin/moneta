import { CurrencyUnit } from "./currency-unit";
import { Monetary } from "./monetary";
import { MonetaryAmount, MonetaryAmountFactory, MonetaryOperator, MonetaryQuery } from "./monetary-amount";
import { MonetaryContext } from "./monetary-context";
import { checkAmountParameter } from './money-utils';
import { checkNullAndNaN, isNegative, isNegativeOrZero, isPositive, isPositiveOrZero, isZero } from "./number-utils";

const DEFAULT_MONETARY_CONTEXT: MonetaryContext = {};

export class Money implements MonetaryAmount {
  // TODO: store number as different type for more precise math
  private constructor(private number: number, private currency: CurrencyUnit, private monetaryContext: MonetaryContext = DEFAULT_MONETARY_CONTEXT) {
  }

  abs(): MonetaryAmount {
    // TODO: more sophisticated arithmetic
    return new Money(Math.abs(this.number), this.currency, this.monetaryContext);
  }

  add(amount: MonetaryAmount): MonetaryAmount {
    checkAmountParameter(amount, this.currency);
    // TODO: more sophisticated arithmetic
    return new Money(this.number + amount.getNumber(), this.currency, this.monetaryContext);
  }

  divide(divisor: number): MonetaryAmount {
    return this.divideAndRemainder(divisor)[0];
  }

  divideAndRemainder(divisor: number): [MonetaryAmount, MonetaryAmount] {
    checkNullAndNaN(divisor);

    let quotient: number;
    let remainder: number;

    if (!Number.isFinite(divisor)) {
      quotient = 0;
      remainder = 0;
    } else {
      // TODO: more sophisticated arithmetic
      quotient = this.number / divisor;
      remainder = this.number % divisor;
    }

    return [
      new Money(quotient, this.currency, this.monetaryContext),
      new Money(remainder, this.currency, this.monetaryContext),
    ];
  }

  divideToIntegralValue(divisor: number): MonetaryAmount {
    const isSingleNumberNegative =
      isNegative(this.number) && !isNegative(divisor)
      || !isNegative(this.number) && isNegative(divisor);

    if (!Number.isFinite(divisor)) {
      return new Money(0, this.currency, this.monetaryContext);
    }

    // TODO: More sophisticated arithmetic
    const quotient = Math.floor(Math.abs(this.number / divisor));
    const money = new Money(quotient, this.currency, this.monetaryContext);

    if (isSingleNumberNegative) {
      return money.negate();
    } else {
      return money;
    }
  }

  getContext(): MonetaryContext | undefined {
    return this.monetaryContext;
  }

  getCurrency(): CurrencyUnit {
    return this.currency;
  }

  getFactory<T extends MonetaryAmount>(): MonetaryAmountFactory<T> {
    // TODO: implement
    throw new Error("Method not implemented.");
  }

  getNumber(): number {
    return this.number;
  }

  isEqualTo(amount: MonetaryAmount): boolean {
    checkAmountParameter(amount, this.currency);
    return this.number === amount.getNumber();
  }

  isGreaterThan(amount: MonetaryAmount): boolean {
    checkAmountParameter(amount, this.currency);
    return this.number > amount.getNumber();
  }

  isGreaterThanOrEqualTo(amount: MonetaryAmount): boolean {
    checkAmountParameter(amount, this.currency);
    return this.number >= amount.getNumber();
  }

  isLessThan(amount: MonetaryAmount): boolean {
    checkAmountParameter(amount, this.currency);
    return this.number < amount.getNumber();
  }

  isLessThanOrEqualTo(amount: MonetaryAmount): boolean {
    checkAmountParameter(amount, this.currency);
    return this.number <= amount.getNumber();
  }

  isNegative(): boolean {
    return isNegative(this.number);
  }

  isNegativeOrZero(): boolean {
    return isNegativeOrZero(this.number);
  }

  isPositive(): boolean {
    return isPositive(this.number);
  }

  isPositiveOrZero(): boolean {
    return isPositiveOrZero(this.number);
  }

  isZero(): boolean {
    return isZero(this.number);
  }

  multiply(multiplicand: number): MonetaryAmount {
    checkNullAndNaN(multiplicand);

    // TODO: more sophisticated arithmetic
    return new Money(this.number * multiplicand, this.currency, this.monetaryContext);
  }

  negate(): MonetaryAmount {
    return new Money(-this.number, this.currency, this.monetaryContext);
  }

  static of(number: number, currency: CurrencyUnit): MonetaryAmount;
  static of(number: number, currency: CurrencyUnit, monetaryContext?: MonetaryContext): MonetaryAmount;
  static of(number: number, currencyCode: string): MonetaryAmount;
  static of(number: number, currencyCode: string, monetaryContext?: MonetaryContext): MonetaryAmount;
  static of(number: number, currency: CurrencyUnit | string, monetaryContext?: MonetaryContext): MonetaryAmount {
    if (typeof currency === 'string') {
      currency = Monetary.getCurrency(currency);
    }

    return new Money(number, currency as CurrencyUnit, monetaryContext);
  }

  plus(): MonetaryAmount {
    return new Money(+this.number, this.currency, this.monetaryContext);
  }

  query<R>(query: MonetaryQuery<R>): R {
    // TODO: implement
    throw new Error("Method not implemented.");
  }

  remainder(divisor: number): MonetaryAmount {
    return this.divideAndRemainder(divisor)[1];
  }

  scaleByPowerOfTen(power: number): MonetaryAmount {
    // TODO: more sophisticated arithmetic
    return new Money(this.number * Math.pow(10, power), this.currency, this.monetaryContext);
  }

  signum(): number {
    // TODO: implement
    throw new Error("Method not implemented.");
  }

  stripTrailingZeros(): MonetaryAmount {
    // TODO: implement
    throw new Error("Method not implemented.");
  }

  subtract(amount: MonetaryAmount): MonetaryAmount {
    checkAmountParameter(amount, this.currency);
    // TODO: more sophisticated arithmetic
    return new Money(this.number - amount.getNumber(), this.currency, this.monetaryContext);
  }

  with(operator: MonetaryOperator): MonetaryAmount {
    // TODO: implement
    throw new Error("Method not implemented.");
  }
}