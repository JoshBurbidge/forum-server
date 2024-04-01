export async function getSecretObject(secretKey) {
  if (process.env[secretKey]) {
    return JSON.parse(process.env[secretKey]);
  }

  // return getSecretFromAWS()
}

export async function getSecretString(secretKey) {
  if (process.env[secretKey]) {
    return process.env[secretKey];
  }
}
