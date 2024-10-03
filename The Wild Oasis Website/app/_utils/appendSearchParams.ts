export function appendSearchParams(
  path: string,
  searchParams: Record<string, string | null | undefined>,
): string {
  const validFieldValuePairs = Object.entries(searchParams)
    .map(([field, value]) => (value ? `${field}=${value}` : null))
    .filter((fieldValuePair): fieldValuePair is string =>
      Boolean(fieldValuePair),
    );

  const href =
    validFieldValuePairs.length > 0
      ? path + '?' + validFieldValuePairs.join('&')
      : path;

  return href;
}
