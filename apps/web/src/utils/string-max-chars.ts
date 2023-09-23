export const stringMaxChars = (str: string, maxChars = 50): string =>
  `${str.slice(0, maxChars)}...`
