import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Edit2, 
  Trash2, 
  Key, 
  Power, 
  PowerOff, 
  Mail,
  Search,
  Eye,
  EyeOff
} from 'lucide-react';
// Hook simples para toast
const useToast = () => {
  const [messages, setMessages] = React.useState<any[]>([]);
  
  const addToast = (type: string, title: string, message: string) => {
    const id = Date.now();
    setMessages(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== id));
    }, 4000);
  };

  return {
    messages,
    success: (title: string, message: string) => addToast('success', title, message),
    error: (title: string, message: string) => addToast('error', title, message),
    warning: (title: string, message: string) => addToast('warning', title, message),
    closeToast: (id: number) => setMessages(prev => prev.filter(msg => msg.id !== id))
  };
};

// Componente Toast Container simples
const ToastContainer: React.FC<{ messages: any[], onClose: (id: number) => void }> = ({ messages, onClose }) => {
  if (messages.length === 0) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {messages.map((msg) => (
        <div key={msg.id} className={`p-4 rounded-lg shadow-lg max-w-sm ${
          msg.type === 'success' ? 'bg-green-600' : 
          msg.type === 'error' ? 'bg-red-600' : 
          msg.type === 'warning' ? 'bg-yellow-600' : 'bg-blue-600'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-white">{msg.title}</h4>
              <p className="text-white/90 text-sm mt-1">{msg.message}</p>
            </div>
            <button onClick={() => onClose(msg.id)} className="text-white/80 hover:text-white ml-2">
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

interface Operador {
  id: string;
  nomeCompleto: string;
  email: string;
  role: 'admin' | 'operator';
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  passwordPlain?: string;
}

interface OperadorFormData {
  nomeCompleto: string;
  email: string;
  role: 'admin' | 'operator';
  ativo: boolean;
  senha?: string;
  gerarSenhaAutomatica?: boolean;
}

const OperadoresPage: React.FC = () => {
  const [operadores, setOperadores] = useState<Operador[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingOperador, setEditingOperador] = useState<Operador | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [senhaGerada, setSenhaGerada] = useState<string | null>(null);
  const [showSenha, setShowSenha] = useState(false);
  
  const [formData, setFormData] = useState<OperadorFormData>({
    nomeCompleto: '',
    email: '',
    role: 'operator',
    ativo: true,
    senha: '',
    gerarSenhaAutomatica: true,
  });
  
  const toast = useToast();

  useEffect(() => {
    carregarOperadores();
  }, []);

  const carregarOperadores = () => {
    setLoading(true);
    
    // Dados mock locais
    const mockOperadores: Operador[] = [
      {
        id: '1',
        nomeCompleto: 'Admin Sistema',
        email: 'admin@exercito.mil.br',
        role: 'admin',
        ativo: true,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        lastLogin: '2024-01-15T10:30:00.000Z',
      },
      {
        id: '2',
        nomeCompleto: 'João Silva Operador',
        email: 'joao.silva@exercito.mil.br',
        role: 'operator',
        ativo: true,
        createdAt: '2024-01-02T00:00:00.000Z',
        updatedAt: '2024-01-02T00:00:00.000Z',
        lastLogin: '2024-01-14T14:20:00.000Z',
      },
      {
        id: '3',
        nomeCompleto: 'Maria Santos Operadora',
        email: 'maria.santos@exercito.mil.br',
        role: 'operator',
        ativo: false,
        createdAt: '2024-01-03T00:00:00.000Z',
        updatedAt: '2024-01-10T00:00:00.000Z',
      },
    ];
    
    setTimeout(() => {
      setOperadores(mockOperadores);
      setLoading(false);
    }, 500); // Simula um pequeno delay
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nomeCompleto.trim() || !formData.email.trim()) {
      toast.warning('Campos obrigatórios', 'Por favor, preencha nome completo e email.');
      return;
    }

    // Validação simples de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Email inválido', 'Por favor, insira um email válido.');
      return;
    }

    // Validação de senha para novos operadores
    if (!editingOperador && !formData.gerarSenhaAutomatica) {
      if (!formData.senha || formData.senha.trim().length < 6) {
        toast.error('Senha inválida', 'A senha deve ter pelo menos 6 caracteres.');
        return;
      }
    }

    setLoading(true);
    
    setTimeout(() => {
      if (editingOperador) {
        // Atualizar operador existente
        const operadorAtualizado: Operador = {
          ...editingOperador,
          nomeCompleto: formData.nomeCompleto,
          email: formData.email,
          role: formData.role,
          ativo: formData.ativo,
          updatedAt: new Date().toISOString(),
        };
        
        setOperadores(prev => prev.map(op => 
          op.id === editingOperador.id ? operadorAtualizado : op
        ));
        
        toast.success('Operador atualizado', 'As informações do operador foram atualizadas com sucesso.');
      } else {
        // Criar novo operador
        const novoId = (Date.now() + Math.random()).toString();
        let senhaGerada = '';
        
        if (formData.gerarSenhaAutomatica) {
          // Gerar senha automática
          senhaGerada = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
        } else {
          senhaGerada = formData.senha || '';
        }
        
        const novoOperador: Operador = {
          id: novoId,
          nomeCompleto: formData.nomeCompleto,
          email: formData.email,
          role: formData.role,
          ativo: formData.ativo,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          passwordPlain: formData.gerarSenhaAutomatica ? senhaGerada : undefined,
        };
        
        setOperadores(prev => [...prev, novoOperador]);
        toast.success('Operador criado', 'O operador foi criado com sucesso.');
        
        // Mostrar senha gerada se foi criada automaticamente
        if (formData.gerarSenhaAutomatica) {
          setSenhaGerada(senhaGerada);
        }
      }
      
      resetForm();
      setLoading(false);
    }, 1000); // Simula delay de API
  };

  const handleEdit = (operador: Operador) => {
    setEditingOperador(operador);
    setFormData({
      nomeCompleto: operador.nomeCompleto,
      email: operador.email,
      role: operador.role,
      ativo: operador.ativo,
      senha: '',
      gerarSenhaAutomatica: false,
    });
    setShowForm(true);
    setSenhaGerada(null);
  };

  const handleDelete = (operador: Operador) => {
    if (!window.confirm(`Tem certeza que deseja excluir o operador "${operador.nomeCompleto}"?`)) {
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setOperadores(prev => prev.filter(op => op.id !== operador.id));
      toast.success('Operador excluído', 'O operador foi excluído com sucesso.');
      setLoading(false);
    }, 500);
  };

  const handleGerarSenha = (operadorId: string) => {
    setLoading(true);
    
    setTimeout(() => {
      // Gerar nova senha automática
      const novaSenha = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
      
      // Atualizar operador com nova senha
      setOperadores(prev => prev.map(op => 
        op.id === operadorId 
          ? { ...op, passwordPlain: novaSenha, updatedAt: new Date().toISOString() }
          : op
      ));
      
      setSenhaGerada(novaSenha);
      setShowSenha(false);
      toast.success('Senha gerada', 'Nova senha temporária foi gerada com sucesso.');
      setLoading(false);
    }, 500);
  };

  const handleToggleStatus = (operador: Operador) => {
    setLoading(true);
    
    setTimeout(() => {
      const novoStatus = !operador.ativo;
      const operadorAtualizado: Operador = {
        ...operador,
        ativo: novoStatus,
        updatedAt: new Date().toISOString(),
      };
      
      setOperadores(prev => prev.map(op => 
        op.id === operador.id ? operadorAtualizado : op
      ));
      
      toast.success(
        `Operador ${novoStatus ? 'ativado' : 'desativado'}`,
        `O operador foi ${novoStatus ? 'ativado' : 'desativado'} com sucesso.`
      );
      setLoading(false);
    }, 500);
  };

  const resetForm = () => {
    setFormData({
      nomeCompleto: '',
      email: '',
      role: 'operator',
      ativo: true,
      senha: '',
      gerarSenhaAutomatica: true,
    });
    setEditingOperador(null);
    setShowForm(false);
    setSenhaGerada(null);
  };

  const operadoresFiltrados = operadores.filter(operador =>
    operador.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    operador.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatarData = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getRoleLabel = (role: string) => {
    return role === 'admin' ? 'Administrador' : 'Operador';
  };

  const getRoleColor = (role: string) => {
    return role === 'admin' ? 'bg-purple-900 text-purple-100' : 'bg-blue-900 text-blue-100';
  };

  return (
    <div className="space-y-6">
      <ToastContainer messages={toast.messages} onClose={toast.closeToast} />
      
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-primary-400" />
            Operadores do Sistema
          </h1>
          <p className="text-gray-400 mt-2">
            Gerencie os operadores que têm acesso ao sistema
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
          disabled={loading}
        >
          <Plus className="w-4 h-4" />
          Novo Operador
        </button>
      </div>

      {/* Barra de pesquisa */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Pesquisar por nome ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-white placeholder-gray-400"
        />
      </div>

      {/* Senha gerada */}
      {senhaGerada && (
        <div className="card border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">
                🔑 Senha Temporária Gerada
              </h3>
              <p className="text-gray-300 mb-3">
                Anote esta senha, ela será exibida apenas uma vez:
              </p>
              <div className="flex items-center gap-3">
                <code className="bg-gray-900 px-4 py-2 rounded text-green-300 font-mono text-lg select-all">
                  {showSenha ? senhaGerada : '••••••••••••'}
                </code>
                <button
                  onClick={() => setShowSenha(!showSenha)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {showSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              onClick={() => setSenhaGerada(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Formulário */}
      {showForm && (
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-4">
            {editingOperador ? 'Editar Operador' : 'Novo Operador'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formData.nomeCompleto}
                  onChange={(e) => setFormData(prev => ({ ...prev, nomeCompleto: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-white placeholder-gray-400"
                  placeholder="Nome completo do operador"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-white placeholder-gray-400"
                  placeholder="email@exercito.mil.br"
                  required
                />
              </div>
            </div>
            
            {/* Configuração de Senha - apenas para novos operadores */}
            {!editingOperador && (
              <div className="border border-gray-600 rounded-lg p-4 bg-gray-800/50">
                <h3 className="text-lg font-medium text-white mb-3">Configuração de Senha</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="gerar-automatica"
                      name="senha-opcao"
                      checked={formData.gerarSenhaAutomatica}
                      onChange={() => setFormData(prev => ({ 
                        ...prev, 
                        gerarSenhaAutomatica: true, 
                        senha: '' 
                      }))}
                      className="w-4 h-4 text-primary-600 bg-gray-700 border-gray-600 focus:ring-primary-500 focus:ring-2"
                    />
                    <label htmlFor="gerar-automatica" className="text-sm text-gray-300">
                      Gerar senha automaticamente (recomendado)
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="definir-manual"
                      name="senha-opcao"
                      checked={!formData.gerarSenhaAutomatica}
                      onChange={() => setFormData(prev => ({ 
                        ...prev, 
                        gerarSenhaAutomatica: false 
                      }))}
                      className="w-4 h-4 text-primary-600 bg-gray-700 border-gray-600 focus:ring-primary-500 focus:ring-2"
                    />
                    <label htmlFor="definir-manual" className="text-sm text-gray-300">
                      Definir senha manualmente
                    </label>
                  </div>
                  
                  {!formData.gerarSenhaAutomatica && (
                    <div className="mt-3">
                      <input
                        type="password"
                        placeholder="Digite a senha (mín. 6 caracteres)"
                        value={formData.senha || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, senha: e.target.value }))}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-white placeholder-gray-400"
                        minLength={6}
                        required={!formData.gerarSenhaAutomatica}
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        A senha deve ter pelo menos 6 caracteres
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Função
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'admin' | 'operator' }))}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-white"
                >
                  <option value="operator">Operador</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-3">
                <label className="block text-sm font-medium text-gray-300">
                  Status
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ativo"
                    checked={formData.ativo}
                    onChange={(e) => setFormData(prev => ({ ...prev, ativo: e.target.checked }))}
                    className="w-4 h-4 text-primary-600 bg-gray-700 border-gray-600 rounded focus:ring-primary-500 focus:ring-2"
                  />
                  <label htmlFor="ativo" className="ml-2 text-sm text-gray-300">
                    Operador ativo
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="btn-secondary"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Salvando...' : (editingOperador ? 'Atualizar' : 'Criar Operador')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de operadores */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            Lista de Operadores ({operadoresFiltrados.length})
          </h2>
        </div>
        
        {loading && !showForm ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <p className="text-gray-400 mt-2">Carregando operadores...</p>
          </div>
        ) : operadoresFiltrados.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            {searchTerm ? 'Nenhum operador encontrado com esse termo.' : 'Nenhum operador cadastrado.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Nome</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Senha</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Função</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Último Login</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Ações</th>
                </tr>
              </thead>
              <tbody>
                {operadoresFiltrados.map((operador) => (
                  <tr key={operador.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-white">{operador.nomeCompleto}</div>
                      <div className="text-sm text-gray-400">ID: {operador.id}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-4 h-4" />
                        {operador.email}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {operador.passwordPlain ? (
                          <div className="flex items-center gap-2">
                            <code className="bg-gray-900 px-2 py-1 rounded text-green-300 font-mono text-xs select-all">
                              {operador.passwordPlain}
                            </code>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(operador.passwordPlain || '');
                                toast.success('Senha copiada!', 'A senha foi copiada para a área de transferência.');
                              }}
                              className="p-1 text-gray-400 hover:text-white transition-colors"
                              title="Copiar senha"
                            >
                              📋
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-xs">Não disponível</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(operador.role)}`}>
                        {getRoleLabel(operador.role)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`flex items-center gap-2 ${operador.ativo ? 'text-green-400' : 'text-red-400'}`}>
                        {operador.ativo ? <Power className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
                        {operador.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {operador.lastLogin ? formatarData(operador.lastLogin) : 'Nunca'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(operador)}
                          className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                          title="Editar operador"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleGerarSenha(operador.id)}
                          className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                          title="Gerar nova senha"
                        >
                          <Key className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(operador)}
                          className={`p-1 transition-colors ${
                            operador.ativo 
                              ? 'text-red-400 hover:text-red-300' 
                              : 'text-green-400 hover:text-green-300'
                          }`}
                          title={operador.ativo ? 'Desativar operador' : 'Ativar operador'}
                        >
                          {operador.ativo ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDelete(operador)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                          title="Excluir operador"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OperadoresPage;
