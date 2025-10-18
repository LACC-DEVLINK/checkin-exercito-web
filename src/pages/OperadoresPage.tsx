import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit2, Trash2, Power, PowerOff, Mail, Search, Eye, EyeOff, X } from 'lucide-react';
import usersService, { User, CreateUserDto, UpdateUserDto } from '../services/users.service';
import { useAuth } from '../contexts/AuthContext';

const OperadoresPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'OPERATOR' as 'ADMIN' | 'SUPERVISOR' | 'OPERATOR',
    isActive: true,
    generatePassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await usersService.getAll();
      setUsers(data);
    } catch (error: any) {
      console.error('Erro ao carregar usuários:', error);
      alert(error.response?.data?.message || 'Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        isActive: user.isActive,
        generatePassword: false,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'OPERATOR',
        isActive: true,
        generatePassword: false,
      });
    }
    setGeneratedPassword(null);
    setShowPassword(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setGeneratedPassword(null);
    setShowPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAdmin()) {
      alert('Apenas administradores podem criar/editar usuários');
      return;
    }

    if (!formData.name || !formData.email) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    if (!editingUser && !formData.password && !formData.generatePassword) {
      alert('Informe uma senha ou gere uma senha automática');
      return;
    }

    try {
      setLoading(true);

      let password = formData.password;
      if (formData.generatePassword) {
        password = generateRandomPassword();
        setGeneratedPassword(password);
      }

      if (editingUser) {
        const updateData: UpdateUserDto = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          isActive: formData.isActive,
        };

        if (password) {
          updateData.password = password;
        }

        await usersService.update(editingUser.id, updateData);
        alert('Usuário atualizado com sucesso!');
        handleCloseModal();
      } else {
        const createData: CreateUserDto = {
          name: formData.name,
          email: formData.email,
          password: password,
          role: formData.role,
          isActive: formData.isActive,
        };

        await usersService.create(createData);

        if (formData.generatePassword) {
          alert('Usuário criado com sucesso!' + String.fromCharCode(10) + String.fromCharCode(10) + 'Senha gerada: ' + password + String.fromCharCode(10) + String.fromCharCode(10) + 'Anote esta senha, ela não será exibida novamente.');
        } else {
          alert('Usuário criado com sucesso!');
        }

        handleCloseModal();
      }

      await loadUsers();
    } catch (error: any) {
      console.error('Erro ao salvar usuário:', error);
      alert(error.response?.data?.message || 'Erro ao salvar usuário');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!isAdmin()) {
      alert('Apenas administradores podem excluir usuários');
      return;
    }

    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) {
      return;
    }

    try {
      setLoading(true);
      await usersService.delete(id);
      alert('Usuário excluído com sucesso!');
      await loadUsers();
    } catch (error: any) {
      console.error('Erro ao excluir usuário:', error);
      alert(error.response?.data?.message || 'Erro ao excluir usuário');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (user: User) => {
    if (!isAdmin()) {
      alert('Apenas administradores podem alterar o status de usuários');
      return;
    }

    try {
      setLoading(true);
      await usersService.toggleActive(user.id);
      alert('Usuário ' + (user.isActive ? 'desativado' : 'ativado') + ' com sucesso!');
      await loadUsers();
    } catch (error: any) {
      console.error('Erro ao alterar status:', error);
      alert(error.response?.data?.message || 'Erro ao alterar status');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const badges = {
      ADMIN: 'bg-red-500/20 text-red-400 border-red-500',
      SUPERVISOR: 'bg-blue-500/20 text-blue-400 border-blue-500',
      OPERATOR: 'bg-green-500/20 text-green-400 border-green-500',
    };
    return badges[role as keyof typeof badges] || badges.OPERATOR;
  };

  const getRoleLabel = (role: string) => {
    const labels = {
      ADMIN: 'Administrador',
      SUPERVISOR: 'Supervisor',
      OPERATOR: 'Operador',
    };
    return labels[role as keyof typeof labels] || role;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Users size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-cyan-400">GERENCIAR OPERADORES</h1>
                <p className="text-gray-400 mt-1">Controle de usuários do sistema</p>
              </div>
            </div>

            {isAdmin() && (
              <button
                onClick={() => handleOpenModal()}
                disabled={loading}
                className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={20} />
                <span>NOVO OPERADOR</span>
              </button>
            )}
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome ou email..."
              className="w-full bg-slate-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800 border border-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Total de Usuários</div>
            <div className="text-2xl font-bold text-cyan-400">{users.length}</div>
          </div>
          <div className="bg-slate-800 border border-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Administradores</div>
            <div className="text-2xl font-bold text-red-400">
              {users.filter(u => u.role === 'ADMIN').length}
            </div>
          </div>
          <div className="bg-slate-800 border border-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Supervisores</div>
            <div className="text-2xl font-bold text-blue-400">
              {users.filter(u => u.role === 'SUPERVISOR').length}
            </div>
          </div>
          <div className="bg-slate-800 border border-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Operadores</div>
            <div className="text-2xl font-bold text-green-400">
              {users.filter(u => u.role === 'OPERATOR').length}
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700/50 border-b border-gray-700">
                  <th className="text-left p-4 text-cyan-400 font-semibold">Nome</th>
                  <th className="text-left p-4 text-cyan-400 font-semibold">Email</th>
                  <th className="text-left p-4 text-cyan-400 font-semibold">Função</th>
                  <th className="text-center p-4 text-cyan-400 font-semibold">Status</th>
                  <th className="text-center p-4 text-cyan-400 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400">
                      Carregando...
                    </td>
                  </tr>
                )}

                {!loading && filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400">
                      Nenhum usuário encontrado
                    </td>
                  </tr>
                )}

                {!loading && filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700 hover:bg-slate-700/30 transition-colors">
                    <td className="p-4">
                      <div className="text-white font-medium">{user.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Mail size={16} />
                        <span>{user.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={'px-3 py-1 rounded-full text-xs font-medium border ' + getRoleBadge(user.role)}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={'px-3 py-1 rounded-full text-xs font-medium ' + (user.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400')}>
                        {user.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center space-x-2">
                        {isAdmin() && (
                          <>
                            <button
                              onClick={() => handleOpenModal(user)}
                              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleToggleActive(user)}
                              className={'p-2 ' + (user.isActive ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700') + ' text-white rounded-lg transition-colors'}
                              title={user.isActive ? 'Desativar' : 'Ativar'}
                            >
                              {user.isActive ? <PowerOff size={16} /> : <Power size={16} />}
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                              title="Excluir"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-cyan-500/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-cyan-400">
                {editingUser ? 'EDITAR OPERADOR' : 'NOVO OPERADOR'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-cyan-400 text-sm font-medium mb-2">Nome Completo *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  placeholder="Digite o nome completo"
                  required
                />
              </div>

              <div>
                <label className="block text-cyan-400 text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  placeholder="email@exercito.mil.br"
                  required
                />
              </div>

              <div>
                <label className="block text-cyan-400 text-sm font-medium mb-2">Função *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  required
                >
                  <option value="OPERATOR">Operador</option>
                  <option value="SUPERVISOR">Supervisor</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>

              {!editingUser && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="generatePassword"
                    checked={formData.generatePassword}
                    onChange={(e) => setFormData({ ...formData, generatePassword: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="generatePassword" className="text-gray-300 cursor-pointer">
                    Gerar senha automática
                  </label>
                </div>
              )}

              {!formData.generatePassword && (
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Senha {!editingUser && '*'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      placeholder={editingUser ? 'Deixe em branco para manter a senha atual' : 'Digite uma senha'}
                      required={!editingUser}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              )}

              {generatedPassword && (
                <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg">
                  <div className="text-green-400 font-medium mb-2">Senha Gerada com Sucesso!</div>
                  <div className="bg-slate-900 p-3 rounded font-mono text-white text-center text-lg">
                    {generatedPassword}
                  </div>
                  <div className="text-yellow-400 text-sm mt-2">
                    ⚠️ Anote esta senha! Ela não será exibida novamente.
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="isActive" className="text-gray-300 cursor-pointer">
                  Usuário ativo
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Salvando...' : editingUser ? 'Atualizar' : 'Criar Operador'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperadoresPage;
