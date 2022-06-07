export function checkNullAndNaN(number: number): void {
  if (number == null) {
    throw new Error('Value must not be null');
  }

  if (number === NaN) {
    throw new Error('Value must be a valid number');
  }
}

export function isNegative(number: number): boolean {
  return number < 0;
}

export function isNegativeOrZero(number: number): boolean {
  return number <= 0;
}

export function isPositive(number: number): boolean {
  return number > 0;
}

export function isPositiveOrZero(number: number): boolean {
  return number >= 0;
}

export function isZero(number: number): boolean {
  return number === 0;
}