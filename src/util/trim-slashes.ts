/**
 * Trims off leading and trailing slashes (both / and \\) from the path.
 * For example, `"/pages/about/"` will be returned as `"pages/about"`.
 * This function can be used to ensure the correct number of slashes are present
 * when building URLs.
 *
 * If no slashes are present at the beginning or end of the path, the path is returned as is.
 * @param path The path string that may start or end with slashes.
 * @returns The path without leading or trailing slashes.
 */
export function trimSlashes(path: string): string {
  if (!!path && path.length > 0) {
    path = path.startsWith('/') || path.startsWith('\\') ? path.slice(1) : path;
    path = path.endsWith('/') || path.endsWith('\\') ? path.slice(0, path.length - 1) : path;
  }
  return path;
}
