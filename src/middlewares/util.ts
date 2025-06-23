export function pathMatcher(
  pattern: string | RegExp,
  pathname: string
): boolean {
  const regex =
    typeof pattern === 'string' ? new RegExp(`^${pattern}`) : pattern;
  return regex.test(pathname);
}
