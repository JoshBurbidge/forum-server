import { auth0Get } from "../repositories/auth0-repository";

export async function getUser(userId) {
  const user = await auth0Get(`/users/${userId}`);

  return user;
}
