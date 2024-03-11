export async function getGeneric<T>(
  url: string,
  requestInit?: RequestInit,
): Promise<T> {
  const response = await fetch(url, requestInit);
  if (!response.ok) throw new Error(`ERROR(${response.status}): from get`);

  const data = (await response.json()) as T;
  return data;
}
