import { API_BASE } from "./base";

export async function api(path, init) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
    },
  });

  // Helpful error messages (so you don’t stare at “500” like it’s a riddle)
  if (!res.ok) {
    let detail = "Request failed";
    try {
      const data = await res.json();
      detail = data?.detail || JSON.stringify(data);
    } catch {
      detail = await res.text();
    }
    throw new Error(`${res.status} ${res.statusText}: ${detail}`);
  }

  // Some endpoints return JSON, some return empty
  const data = await res.json();
  return data;
}
