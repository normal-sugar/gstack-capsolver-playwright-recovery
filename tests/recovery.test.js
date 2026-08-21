import test from "node:test";
import assert from "node:assert/strict";
import { TaskContext, RecoveryCoordinator, detectChallenge, gstackFallbackCommands, CapSolverClient } from "../src/index.js";

const context = (changes = {}) => new TaskContext({ runId: "run-1", targetUrl: "https://qa.example.test/form", purpose: "owned form QA", authorizationReference: "QA-42", allowedHosts: ["qa.example.test"], maxAttempts: 1, timeoutMs: 50, ...changes });
const task = { type: "OfficialTaskTypeFromCurrentDocs", websiteURL: "https://qa.example.test/form" };

test("ready result resumes exactly once with context", async () => {
  let calls = 0; const gateway = { recover: async () => { calls += 1; return { status: "ready", solution: { fixture: true } }; } };
  const coordinator = new RecoveryCoordinator({ gateway });
  const first = await coordinator.run(context(), task); const second = await coordinator.run(context(), task);
  assert.equal(first.action, "resume_once"); assert.equal(first.authorizationReference, "QA-42"); assert.deepEqual(second, first); assert.equal(calls, 1);
});
test("host mismatch fails closed", async () => assert.equal((await new RecoveryCoordinator({ gateway: {} }).run(context({ targetUrl: "https://other.example/form" }), task)).reason, "target_not_allowlisted"));
test("missing authorization fails closed", async () => assert.equal((await new RecoveryCoordinator({ gateway: {} }).run(context({ authorizationReference: "" }), task)).reason, "missing_authorization"));
test("zero budget fails closed", async () => assert.equal((await new RecoveryCoordinator({ gateway: {} }).run(context({ maxAttempts: 0 }), task)).reason, "attempt_budget_exhausted"));
test("gateway error uses human handoff", async () => assert.equal((await new RecoveryCoordinator({ gateway: { recover: async () => ({ status: "error", reason: "fixture_error" }) } }).run(context(), task)).action, "human_handoff"));
test("deadline aborts slow gateway", async () => {
  const gateway = { recover: (_task, { signal }) => new Promise((_resolve, reject) => signal.addEventListener("abort", () => reject(signal.reason), { once: true })) };
  assert.equal((await new RecoveryCoordinator({ gateway }).run(context({ timeoutMs: 5 }), task)).reason, "recovery_timeout");
});
test("challenge detector uses Playwright locator contract", async () => {
  const page = { locator: (selector) => ({ count: async () => selector === "[data-checkpoint]" ? 1 : 0 }) };
  assert.deepEqual(await detectChallenge(page, ["[data-checkpoint]", ".absent"]), { detected: true, matched: ["[data-checkpoint]"] });
});
test("fallback retains documented snapshot handoff resume sequence", () => assert.deepEqual(gstackFallbackCommands(), [["snapshot", "-i", "-c"], ["handoff", "Human review required at the current checkpoint"], ["resume"]]));
test("live client is disabled by default", async () => {
  const old = process.env.CAPSOLVER_ALLOW_LIVE; delete process.env.CAPSOLVER_ALLOW_LIVE;
  assert.deepEqual(await new CapSolverClient().recover(task), { status: "disabled", reason: "live_mode_disabled" });
  if (old !== undefined) process.env.CAPSOLVER_ALLOW_LIVE = old;
});
