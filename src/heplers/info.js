import { bytesToKB, bytesToMB, bytesToGB, bytesToTB } from './file'

/*
 * This file is used to display prompts in various input.
 */

/**
 * Information on transferring bytes to different units.
 *
 * @param {number} bytes
 *
 * @return {string}
 */
export function bytes (bytes) {
  const types = [
    { name: 'TB', method: bytesToTB },
    { name: 'GB', method: bytesToGB },
    { name: 'MB', method: bytesToMB },
    { name: 'KB', method: bytesToKB }
  ]
  let result = ''

  types.forEach((type, index) => {
    let val = Math.floor(type.method(bytes))
    val = index === 0 ? val : val % 100
    result += val + ' ' + type.name + ', '
  })

  return result.substr(0, result.length - 2)
}
