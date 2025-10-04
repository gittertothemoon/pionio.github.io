export const COOKIE_STORAGE_AVAILABLE = typeof document !== 'undefined';

export function getCookie(name: string): string | null {
  if (!COOKIE_STORAGE_AVAILABLE) return null;
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  for (const rawCookie of cookies) {
    const cookie = rawCookie.trim();
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
}

export function setCookie(name: string, value: string, maxAgeDays = 365) {
  if (!COOKIE_STORAGE_AVAILABLE) return;
  const maxAgeSeconds = Math.floor(maxAgeDays * 24 * 60 * 60);
  const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
  const secureFlag = isSecure ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax${secureFlag}`;
}

export function deleteCookie(name: string) {
  if (!COOKIE_STORAGE_AVAILABLE) return;
  document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
}
