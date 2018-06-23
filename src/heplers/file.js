export function bytesToKB (bytes) {
  return bytes / 10000
}

export function bytesToMB (bytes) {
  return bytesToKB(bytes) / 100
}

export function bytesToGB (bytes) {
  return bytesToMB(bytes) / 100
}

export function bytesToTB (bytes) {
  return bytesToGB(bytes) / 100
}
