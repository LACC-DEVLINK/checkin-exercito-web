import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular login
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary-500 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-600 rounded-full opacity-5 animate-pulse"></div>
      
      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gray-800 bg-opacity-95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">SISTEMA CHECK-IN</h1>
            <p className="text-gray-400 text-sm">PAINEL ADMINISTRATIVO</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Username Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Usuário
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  className="input-field w-full pl-10"
                  placeholder="Digite seu usuário ou e-mail"
                  required
                />
                <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="input-field w-full pl-10"
                  placeholder="Digite sua senha"
                  required
                />
                <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 futuristic-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ENTRANDO...
                </div>
              ) : (
                'ENTRAR'
              )}
            </button>
          </form>

          {/* Offline Mode Toggle */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOfflineMode}
                  onChange={(e) => setIsOfflineMode(e.target.checked)}
                  className="sr-only"
                />
                <div className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${
                  isOfflineMode ? 'bg-primary-600' : 'bg-gray-600'
                }`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                    isOfflineMode ? 'translate-x-4' : 'translate-x-0'
                  }`}></div>
                </div>
                <span className="ml-3 text-sm text-gray-300">Modo Offline</span>
              </label>
            </div>
            <button
              type="button"
              className="text-primary-400 hover:text-primary-300 text-sm transition-colors duration-200"
            >
              Esqueceu a senha?
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Sistema desenvolvido para controle de acesso em eventos
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
