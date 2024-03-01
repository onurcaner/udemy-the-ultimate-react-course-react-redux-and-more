export function changePageTitle(title?: string): void {
  document.title = 'usePopcorn';
  if (!title) return;

  document.title += ` | ${title}`;
}
