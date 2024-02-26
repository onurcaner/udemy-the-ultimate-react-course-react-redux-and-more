export function createBemClassName(
  blockClassName?: string,
  elementClassName?: string
): string | undefined {
  if (!blockClassName) return undefined;
  if (!elementClassName) return blockClassName;
  return `${blockClassName}__${elementClassName}`;
}
