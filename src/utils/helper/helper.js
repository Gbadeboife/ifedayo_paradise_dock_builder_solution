export const capitalize = (string) => {
  const removedSpecialCharacters = string.replace(/[^a-zA-Z0-9]/g, " ")

  const splitWords = removedSpecialCharacters.split(' ')
  const capitalized = splitWords.map((dt) => `${dt[0].toUpperCase()}${dt.substring(1).toLowerCase()}`)

  return capitalized.join(" ")
}