export function isDevRouteAccessAllowed(
  env: Pick<NodeJS.ProcessEnv, "NODE_ENV"> = process.env,
) {
  return env.NODE_ENV !== "production";
}
