import axios from "axios";
import config from 'config';
import { getManagementApiToken } from "./auth0-token-repository";

const AUTH0_API_URL = config.get('auth0ApiUrl');

export async function auth0Get(path) {
  const token = await getManagementApiToken();

  const url = `${AUTH0_API_URL}${path}`;

  console.log('Outgoing: GET ', url);

  const result = await axios.get(url,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return result.data;
}
