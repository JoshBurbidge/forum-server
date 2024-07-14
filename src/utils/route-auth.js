import { auth } from "express-oauth2-jwt-bearer";

export const verifyJwt = auth({
  audience: 'forum-api',
  issuerBaseURL: `https://dev-ez2f8ejiacjig1qh.us.auth0.com/`,
  algorithms: ["RS256"],
});
