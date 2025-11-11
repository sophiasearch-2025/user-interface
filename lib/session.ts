import "server-only";

export interface UserData {
  name: string;
  role: string;
  initial: string;
}

export async function fetchUserData(): Promise<UserData | null> {
  return null;
}

export async function isAuthenticated() {
  const user = await fetchUserData();
  return !!user;
}
