import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import config from 'config';

async function getSecretFromAWS(secretKey) {
  const client = new SecretsManagerClient({
    region: 'us-east-1'
  });
  const input = {
    SecretId: config.get(`secrets.${secretKey}`),
  };
  const command = new GetSecretValueCommand(input);
  const response = await client.send(command);

  return response.SecretString;
}

function isLocalhost() {
  return config.get('env') === 'localhost';
}

export async function getSecretObject(secretKey) {
  if (isLocalhost() && process.env[secretKey]) {
    return JSON.parse(process.env[secretKey]);
  }

  const secretString = await getSecretFromAWS(secretKey);

  return JSON.parse(secretString);
}

export async function getSecretString(secretKey) {
  if (isLocalhost() && process.env[secretKey]) {
    return process.env[secretKey];
  }

  const secretString = await getSecretFromAWS(secretKey);

  return secretString;
}
