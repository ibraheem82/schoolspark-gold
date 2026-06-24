import { currentUser, type User } from "./mockData";

const KEY = "schoolsync_auth";

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function signIn(_email: string, _password: string): User {
  const user = currentUser;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(user));
  }
  return user;
}

export function signOut(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(KEY);
  }
}

export function isAuthenticated(): boolean {
  return getStoredUser() !== null;
}