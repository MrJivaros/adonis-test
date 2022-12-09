export interface FetchJSON {
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT',
  url: string,
  body?: string
}
export default async function fetchJSON({ method = 'GET', url, body = undefined }: FetchJSON) {
  const response = await fetch(url, {
    method,
    body,
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
}
