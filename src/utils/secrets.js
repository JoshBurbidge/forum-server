export async function getSecret(secretKey) {
  if (process.env[secretKey]) {
    return JSON.parse(process.env[secretKey]);
  }

  // return getSecretFromAWS()
}
