import axios from 'axios';
import config from 'config';
import { getSecretObject } from '../utils/secrets';

export async function getManagementApiToken() {
  const clientId = config.get('auth0ClientId');
  const { clientSecret } = await getSecretObject('auth0ClientSecret');
  const body = { // uses API explorer credentials because they have grants for all scopes - need to create another app for this
    "client_id": clientId,
    "client_secret": clientSecret,
    "audience": `${config.get('auth0ApiUrl')}/`,
    "grant_type": "client_credentials"
  };

  const tokenResponse = await axios.post('https://dev-ez2f8ejiacjig1qh.us.auth0.com/oauth/token', body);

  console.log('Retrieved auth0 token for client id ', clientId);

  return tokenResponse.data.access_token;
}
