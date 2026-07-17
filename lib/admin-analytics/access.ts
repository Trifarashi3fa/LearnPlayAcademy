export function isAdminAnalyticsPreviewEnabled(env: NodeJS.ProcessEnv = process.env) {
  return env.NODE_ENV !== "production" || env.NEXT_PUBLIC_ENABLE_ADMIN_ANALYTICS === "true";
}
