export const average = (array) => {
  const sum = array.reduce((a, b) => a + b, 0)

  return (sum / array.length) || 0
}

