/**
 * Get the name a social network in lower case from path.
 *
 * @param {String} path
 * @return {String} name
 */
export function getNameFromFolder (path) {
  return path.match(/\.\/([a-z]+)\//i)[1].toLowerCase()
}
