export default function fixContentForSearch(content, forLunr = false) {
  // Удалить строки с "title", "metaTitle", "metaDescription" и "---" из исходного текста
  const newContent = content
    .replace(/title:.*\n/g, '')
    .replace(/metaTitle:.*\n/g, '')
    .replace(/metaDescription:.*\n/g, '')
    .replace(/---\n/g, '')
    .replace(/<code.*?>/g, '')
    .replace(/<\/code>/g, '')
    .replace(/<img[^>]*\/>/g, '')
    .replace(/<div[^>]*>/g, '')
    .replace(/<\/div>/g, '')
    .replace(/{`/g, '')
    .replace(/`}/g, '')
    // Удалить все символы Markdown из исходного текста
    // .replace(/(?:__|[*#])|\[(.*?)\]\(.*?\)/g, '$1');

  return forLunr
    ? newContent
        .replace(/<table[^>]*>/g, '')
        .replace(/<\/table>/g, '')
        .replace(/<tr[^>]*>/g, '')
        .replace(/<\/tr>/g, '')
        .replace(/<th[^>]*>/g, '')
        .replace(/<\/th>/g, '')
        .replace(/<td[^>]*>/g, '')
        .replace(/<\/td>/g, '')
    : newContent;
}
