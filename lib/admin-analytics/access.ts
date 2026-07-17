import { isDevRouteAccessAllowed } from "@/lib/dev-routes/access";

export function isAdminAnalyticsPreviewEnabled(
  env: Pick<NodeJS.ProcessEnv, "NODE_ENV"> = process.env,
) {
  return isDevRouteAccessAllowed(env);
}
