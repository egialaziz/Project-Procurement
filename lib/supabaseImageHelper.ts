export function getSupabaseThumbnailUrl(originalUrl: string, width: number = 150, height: number = 150): string {
  if (!originalUrl) return '';

  if (!originalUrl.includes('/object/public/')) {
    return originalUrl;
  }

  const transformedUrl = originalUrl.replace('/object/public/', '/render/image/public/');
  return `${transformedUrl}?width=${width}&height=${height}&quality=80`;
}
