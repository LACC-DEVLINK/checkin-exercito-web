import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { LoginCredentials, User } from '../services/auth.service';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  isSupervisor: () => boolean;
  isOperator: () => boolean;
  hasRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      if (authService.isAuthenticated()) {
        const userData = await authService.getProfile();
        setUser(userData);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      await authService.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    await authService.login(credentials);
    const userData = await authService.getProfile();
    setUser(userData);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const isAdmin = () => user?.role === 'ADMIN';
  const isSupervisor = () => user?.role === 'SUPERVISOR';
  const isOperator = () => user?.role === 'OPERATOR';
  const hasRole = (roles: string[]) => user ? roles.includes(user.role) : false;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        isAdmin,
        isSupervisor,
        isOperator,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
