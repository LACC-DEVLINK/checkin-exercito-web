import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
    setError('');
    
    try {
      await login(credentials);
      navigate('/');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Credenciais inválidas';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordLoading(true);
    
    // Simular envio de email de recuperação
    setTimeout(() => {
      setForgotPasswordLoading(false);
      setResetEmailSent(true);
      
      // Fechar modal após 3 segundos
      setTimeout(() => {
        setIsForgotPasswordModalOpen(false);
        setResetEmailSent(false);
        setForgotPasswordEmail('');
      }, 3000);
    }, 1500);
  };

  const openForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(true);
    setResetEmailSent(false);
    setForgotPasswordEmail('');
  };

  const closeForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
    setResetEmailSent(false);
    setForgotPasswordEmail('');
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
            {/* Error Message */}
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg flex items-center space-x-2">
                <AlertTriangle size={16} />
                <span className="text-sm">{error}</span>
              </div>
            )}

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

          {/* Footer Links */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                checked={isOfflineMode}
                onChange={(e) => setIsOfflineMode(e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-gray-700 border-gray-600 rounded focus:ring-primary-500 focus:ring-2"
              />
              <label htmlFor="remember" className="text-sm text-gray-300">
                Lembrar-me
              </label>
            </div>
            
            <button
              type="button"
              onClick={openForgotPasswordModal}
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

      {/* Modal de Recuperação de Senha */}
      {isForgotPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 bg-opacity-95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <Mail size={16} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Recuperar Senha</h2>
              </div>
              <button
                onClick={closeForgotPasswordModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {!resetEmailSent ? (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="text-center mb-4">
                    <p className="text-gray-300 text-sm">
                      Digite seu e-mail ou nome de usuário para receber as instruções de recuperação de senha.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="forgotEmail" className="block text-sm font-medium text-gray-300 mb-2">
                      E-mail ou Usuário
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="forgotEmail"
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        className="input-field w-full pl-10"
                        placeholder="Digite seu e-mail ou usuário"
                        required
                      />
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={closeForgotPasswordModal}
                      className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={forgotPasswordLoading || !forgotPasswordEmail.trim()}
                      className="flex-1 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {forgotPasswordLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Enviando...
                        </div>
                      ) : (
                        'Enviar'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">E-mail Enviado!</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    As instruções para redefinir sua senha foram enviadas para:
                  </p>
                  <p className="text-primary-400 font-medium text-sm bg-gray-700 rounded-lg px-3 py-2 mb-4">
                    {forgotPasswordEmail}
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs">
                    <AlertTriangle size={14} />
                    <span>Verifique também sua caixa de spam</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
