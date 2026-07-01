import { createContext, useContext, useMemo, useState } from 'react';
import { loginUser } from '../api/authApi.js';

const AuthContext = createContext(null);
const STORAGE_KEY = 'rentalpro_session';

function readStoredSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession);

  async function login(username, password) {
    const result = await loginUser(username, password);
    const nextSession = {
      userId: result.userId,
      username: result.username,
      role: result.role,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
    return nextSession;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }

  const value = useMemo(() => ({ session, login, logout }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider.');
  return context;
}
