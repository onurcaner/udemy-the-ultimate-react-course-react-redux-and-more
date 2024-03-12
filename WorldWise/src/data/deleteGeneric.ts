export async function deleteGeneric<T>(
  url: string,
  requestInit?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...requestInit,
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(`ERROR(${response.status}): from delete`);

  const responseData = (await response.json()) as T;
  return responseData;
}
