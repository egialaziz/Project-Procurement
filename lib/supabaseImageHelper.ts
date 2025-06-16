export function getSupabaseThumbnailUrl(originalUrl: string, width: number = 150, height: number = 150): string {
  if (!originalUrl) return '';

  // Cek apakah URL valid Supabase Storage
  if (!originalUrl.includes('/object/public/')) {
    return originalUrl;  // biarkan kalau bukan dari supabase storage
  }

  // Replace bagian URL untuk pakai CDN image resizing
  const transformedUrl = originalUrl.replace('/object/public/', '/render/image/public/');

  // Tambahkan query parameter width dan height
  return `${transformedUrl}?width=${width}&height=${height}&quality=80`;
}
