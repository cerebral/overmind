/**
 * Generates a nonce string for use in Content Security Policy
 * @returns A random nonce string
 */
export function getNonce(): string {
  let nonce = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    nonce += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return nonce
}
