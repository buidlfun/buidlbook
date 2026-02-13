const TURSO_URL = process.env.TURSO_DATABASE_URL!;
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN!;

export async function query(sql: string, args: any[] = []): Promise<Record<string, any>[]> {
  const url = TURSO_URL.replace("libsql://", "https://");

  const stmtArgs = args.map((a) => {
    if (a === null || a === undefined) return { type: "null", value: null };
    if (typeof a === "number" && Number.isInteger(a)) return { type: "integer", value: String(a) };
    if (typeof a === "number") return { type: "float", value: String(a) };
    return { type: "text", value: String(a) };
  });

  const res = await fetch(`${url}/v3/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TURSO_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      requests: [
        { type: "execute", stmt: { sql, args: stmtArgs } },
        { type: "close" },
      ],
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Turso error: ${res.status} ${text}`);
  }

  const data = await res.json();
  const first = data.results?.[0];
  
  if (first?.type === "error") {
    throw new Error(`Turso query error: ${first.error?.message || JSON.stringify(first)}`);
  }

  const result = first?.response?.result;
  if (!result || !result.cols || !result.rows) return [];

  const columns = result.cols.map((c: any) => c.name);
  
  return result.rows.map((row: any[]) =>
    Object.fromEntries(columns.map((col: string, i: number) => [col, row[i]?.value ?? null]))
  );
}
