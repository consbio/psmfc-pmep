// Classify a value into an index depending on what range it falls into
// ranges: [[rangeMin, rangeMax], ..., ]
export function classify(value, ranges) {
  let i = 0
  for (i; i < ranges.length; i += 1) {
    if (value >= ranges[i][0] && value < ranges[i][1]) {
      break
    }
  }
  return i
}
