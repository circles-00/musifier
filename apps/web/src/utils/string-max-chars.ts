export const stringMaxChars = (str: string, maxChars = 50): string =>
  str.length > maxChars ? `${str.slice(0, maxChars)}...` : str
