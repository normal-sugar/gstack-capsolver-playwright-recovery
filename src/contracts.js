export class TaskContext {
  constructor({ runId, targetUrl, purpose, authorizationReference, allowedHosts, maxAttempts = 1, timeoutMs = 30_000 }) {
    this.runId = runId;
    this.targetUrl = targetUrl;
    this.purpose = purpose;
    this.authorizationReference = authorizationReference;
    this.allowedHosts = new Set(allowedHosts.map((host) => host.toLowerCase()));
    this.maxAttempts = maxAttempts;
    this.timeoutMs = timeoutMs;
  }
}

export function validateContext(context) {
  let host = "";
  try { host = new URL(context.targetUrl).hostname.toLowerCase(); } catch { return "invalid_target_url"; }
  if (!context.runId?.trim()) return "missing_run_id";
  if (!context.purpose?.trim()) return "missing_purpose";
  if (!context.authorizationReference?.trim()) return "missing_authorization";
  if (!context.allowedHosts.has(host)) return "target_not_allowlisted";
  if (context.maxAttempts < 1) return "attempt_budget_exhausted";
  if (context.timeoutMs < 1) return "invalid_timeout";
  return null;
}
