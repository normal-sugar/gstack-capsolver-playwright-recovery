const CREATE_TASK_URL = "https://api.capsolver.com/createTask";
const GET_RESULT_URL = "https://api.capsolver.com/getTaskResult";

export class CapSolverClient {
  constructor({ apiKey = process.env.CAPSOLVER_API_KEY, fetchImpl = globalThis.fetch, pollMs = 3000, maxPolls = 120 } = {}) {
    this.apiKey = apiKey;
    this.fetch = fetchImpl;
    this.pollMs = pollMs;
    this.maxPolls = Math.min(maxPolls, 120);
  }

  async #post(url, body, signal) {
    const response = await this.fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body), signal });
    if (!response.ok) throw new Error(`http_${response.status}`);
    return response.json();
  }

  async recover(task, { signal } = {}) {
    if (process.env.CAPSOLVER_ALLOW_LIVE !== "1") return { status: "disabled", reason: "live_mode_disabled" };
    if (!this.apiKey) return { status: "disabled", reason: "api_key_missing" };
    if (typeof task?.type !== "string" || typeof task?.websiteURL !== "string") return { status: "error", reason: "invalid_task_contract" };
    const created = await this.#post(CREATE_TASK_URL, { clientKey: this.apiKey, task }, signal);
    if (created.errorId > 0) return { status: "error", reason: created.errorCode || "create_error" };
    if (created.status === "ready") return { status: "ready", solution: created.solution ?? {} };
    if (!created.taskId) return { status: "error", reason: "task_id_missing" };
    for (let poll = 0; poll < this.maxPolls; poll += 1) {
      await new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, this.pollMs);
        signal?.addEventListener("abort", () => { clearTimeout(timer); reject(signal.reason); }, { once: true });
      });
      const result = await this.#post(GET_RESULT_URL, { clientKey: this.apiKey, taskId: created.taskId }, signal);
      if (result.errorId > 0) return { status: "error", reason: result.errorCode || "result_error" };
      if (result.status === "ready") return { status: "ready", solution: result.solution ?? {} };
    }
    return { status: "timeout", reason: "poll_budget_exhausted" };
  }
}
