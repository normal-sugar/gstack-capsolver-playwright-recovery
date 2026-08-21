import { validateContext } from "./contracts.js";

export class RecoveryCoordinator {
  constructor({ gateway, clock = () => Date.now() }) {
    this.gateway = gateway;
    this.clock = clock;
    this.completed = new Map();
  }

  async run(context, task) {
    const contextError = validateContext(context);
    if (contextError) return this.#decision(context, "human_handoff", contextError, 0);
    if (this.completed.has(context.runId)) return this.completed.get(context.runId);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(new Error("recovery_timeout")), context.timeoutMs);
    let result;
    try { result = await this.gateway.recover(task, { signal: controller.signal }); }
    catch (error) { result = { status: "error", reason: error?.message === "recovery_timeout" ? "recovery_timeout" : "gateway_error" }; }
    finally { clearTimeout(timer); }
    const decision = result.status === "ready"
      ? this.#decision(context, "resume_once", "recovery_ready", 1, result.solution)
      : this.#decision(context, "human_handoff", result.reason || result.status, 1);
    this.completed.set(context.runId, decision);
    return decision;
  }

  #decision(context, action, reason, attempts, solution = {}) {
    return { action, reason, attempts, runId: context.runId, targetUrl: context.targetUrl, purpose: context.purpose, authorizationReference: context.authorizationReference, solution };
  }
}

export function gstackFallbackCommands(message = "Human review required at the current checkpoint") {
  return [["snapshot", "-i", "-c"], ["handoff", message], ["resume"]];
}
