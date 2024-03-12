export async function postGeneric<T>(
  url: string,
  data: Omit<T, 'id'>,
  requestInit?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...requestInit,
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!response.ok) throw new Error(`ERROR(${response.status}): from post`);

  const responseData = (await response.json()) as T;
  return responseData;
}
