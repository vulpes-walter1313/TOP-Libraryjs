export function formatLongNums(num: number) {
  // formats a number like 1000000 to a string like 1,000,000
  let arr = String(num).split("");
  let fmtarr: string[] = [];
  while (arr.length != 0) {
    for (let i = 0; i < 3; i++) {
      if (arr) {
        fmtarr.push((arr.pop() as string)?.toString())
      }
    }
    if (arr.length != 0) {
      fmtarr.push(',');
    }
  }
  return fmtarr.reverse().join('');
}