// Classify a value into an index depending on what range it falls into
// ranges: [[rangeMin, rangeMax], ..., ]
export const classify = (value, ranges) => {
  let i = 0
  for (i; i < ranges.length; i += 1) {
    if (value >= ranges[i][0] && value < ranges[i][1]) {
      break
    }
  }
  return i
}

/**
 * Converts an array of ['key:value', ...] to {key: value, }
 * @param {Array of strings} entries
 */
export const packedToObject = entries =>
  entries.reduce((result, part) => {
    const [key, value] = part.split(':')
    /* eslint-disable no-param-reassign */
    result[key] = value
    return result
  }, {})
