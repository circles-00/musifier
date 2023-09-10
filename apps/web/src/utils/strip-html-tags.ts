export const stripHtmlTags = (str: string): string =>
  str.replace(/<[^>]*>?/gm, '')
