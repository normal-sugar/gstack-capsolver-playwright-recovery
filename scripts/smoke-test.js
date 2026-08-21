import { TaskContext, RecoveryCoordinator } from "../src/index.js";
const context = new TaskContext({ runId: "smoke-1", targetUrl: "https://qa.example.test/form", purpose: "owned QA", authorizationReference: "QA-SMOKE", allowedHosts: ["qa.example.test"] });
const gateway = { recover: async () => ({ status: "ready", solution: { fixture: "ok" } }) };
const decision = await new RecoveryCoordinator({ gateway }).run(context, { type: "MockTask", websiteURL: context.targetUrl });
if (decision.action !== "resume_once" || decision.attempts !== 1) throw new Error("smoke failed");
console.log("SMOKE PASSED: one authorized recovery with idempotent context");
