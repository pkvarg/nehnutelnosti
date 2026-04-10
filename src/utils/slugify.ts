const diacriticsMap: Record<string, string> = {
  'á': 'a', 'ä': 'a', 'č': 'c', 'ď': 'd', 'é': 'e', 'í': 'i',
  'ĺ': 'l', 'ľ': 'l', 'ň': 'n', 'ó': 'o', 'ô': 'o', 'ŕ': 'r',
  'š': 's', 'ť': 't', 'ú': 'u', 'ý': 'y', 'ž': 'z',
  'Á': 'a', 'Ä': 'a', 'Č': 'c', 'Ď': 'd', 'É': 'e', 'Í': 'i',
  'Ĺ': 'l', 'Ľ': 'l', 'Ň': 'n', 'Ó': 'o', 'Ô': 'o', 'Ŕ': 'r',
  'Š': 's', 'Ť': 't', 'Ú': 'u', 'Ý': 'y', 'Ž': 'z',
}

export function slugify(text: string): string {
  return text
    .split('')
    .map((char) => diacriticsMap[char] ?? char)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
