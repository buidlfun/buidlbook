import { query } from "./db";

interface ActivityEntry {
  action: string;
  method: string;
  endpoint: string;
  wallet?: string;
  agent_name?: string;
  project_name?: string;
  status_code: number;
  detail?: string;
}

export async function logActivity(entry: ActivityEntry) {
  try {
    await query(
      `INSERT INTO activity_log (action, method, endpoint, wallet, agent_name, project_name, status_code, detail)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        entry.action,
        entry.method,
        entry.endpoint,
        entry.wallet || null,
        entry.agent_name || null,
        entry.project_name || null,
        entry.status_code,
        entry.detail || null,
      ]
    );
  } catch (e) {
    console.error("[Activity] Failed to log:", e);
  }
}
