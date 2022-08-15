export function randomThreeDigitNumber(): number {
  const value = Math.floor(Math.random() * (999 - 100 + 1)) + 100

  return value
}
