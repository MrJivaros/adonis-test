export interface FetchJSON {
  method: 'POST' | 'GET',
  url: string,
  body?: string
}
export default async function fetchJSON({ method, url, body = undefined }: FetchJSON) {
  const response = await fetch(url, {
    method,
    body,
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
}
