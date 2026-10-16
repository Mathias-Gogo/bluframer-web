// The Asha API (bluframer-api). Set VITE_API_URL in .env, e.g. https://your-api.vercel.app
const API = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export const APP_URL = import.meta.env.VITE_APP_URL || "https://app.asha.com.ng";
export const WALL_LINK = "asha.com.ng/wall";
export const WALL_URL = "https://asha.com.ng/wall";

export async function wallApi(path, options = {}) {
  const res = await fetch(`${API}/wall${path}`, {
    ...options,
    headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || "Something went wrong. Try again."), { status: res.status });
  return data;
}

// Sends one screenshot straight to storage with a signed upload URL (same call supabase-js makes).
export async function uploadShot(upload, blob) {
  const body = new FormData();
  body.append("cacheControl", "3600");
  body.append("", blob);
  const res = await fetch(upload.url, { method: "PUT", body, headers: { "x-upsert": "false" } });
  if (!res.ok) throw new Error("A screenshot didn't upload. Check your connection and try again.");
}
