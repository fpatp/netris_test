export const fixedTimes = (number: number) => {
  const toFixed = number.toFixed(3).toString().split('.')
  const min = Math.trunc(+toFixed[0] / 60) + ''
  const sec = +toFixed[0] - +min * 60 + ''

  return min.padStart(2, '0') + ':' + sec.padStart(2, '0') + ':' + toFixed[1]
}
