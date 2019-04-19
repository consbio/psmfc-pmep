export const formatNumber = (number, decimals = null) => {
  const absNumber = Math.abs(number)
  let targetDecimals = decimals
  if (targetDecimals === null) {
    // guess number of decimals based on magnitude
    if (absNumber > 10 || Math.round(absNumber) === absNumber) {
      targetDecimals = 0
    } else if (absNumber > 1) {
      targetDecimals = 1
    } else {
      targetDecimals = 2
    }
  }
  // override targetDecimals for integer values
  if (Math.round(absNumber) === absNumber) {
    targetDecimals = 0
  }

  const factor = 10 ** targetDecimals

  // format to localeString, and manually set the desired number of decimal places
  return (Math.round(number * factor) / factor).toLocaleString(undefined, {
    minimumFractionDigits: targetDecimals,
    maximumFractionDigits: targetDecimals,
  })
}

// CohoSalmon -> Coho Salmon
export function splitWords(text) {
  let newText = ''
  for (let i = 0; i < text.length; i += 1) {
    if (i > 0 && text[i] === text[i].toUpperCase()) {
      newText += ` ${text[i]}`
    } else {
      newText += text[i]
    }
  }
  return newText
}
