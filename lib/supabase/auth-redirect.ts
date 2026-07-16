const localDevelopmentOrigin = "http://localhost:3000";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function normalizeSiteUrl(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimTrailingSlash(trimmed);
}

function normalizeVercelUrl(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return trimTrailingSlash(withProtocol);
}

function isLocalDevelopment() {
  return process.env.NODE_ENV === "development";
}

function getNonLocalBrowserOrigin() {
  if (typeof window === "undefined") return null;
  const origin = normalizeSiteUrl(window.location.origin);
  if (!origin) return null;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)) return null;
  return origin;
}

export function getAuthRedirectOrigin() {
  return (
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeVercelUrl(process.env.VERCEL_URL) ??
    getNonLocalBrowserOrigin() ??
    (isLocalDevelopment() ? localDevelopmentOrigin : "")
  );
}

export function getAuthRedirectUrl(path: `/${string}`) {
  const origin = getAuthRedirectOrigin();
  if (!origin) return path;
  return `${origin}${path}`;
}
