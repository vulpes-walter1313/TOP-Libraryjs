export function formatLongNums(num: number): string {
  // formats a number like 1000000 to a string like 1,000,000
  return Array.from(num.toString())
    .reverse()
    .map((letter, index) => (index + 1) % 3 === 0 ? `,${letter}` : letter)
    .reverse()
    .join("");
}