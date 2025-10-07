import React, { useState, useEffect } from 'react';
import CreateParticipantModal from '../components/CreateParticipantModal';
import { Edit, Smartphone, Trash2, X, QrCode, AlertTriangle, Camera, Upload } from 'lucide-react';

interface Participant {
  id: string;
  nomeCompleto: string;
  postoGrad: string;
  funcao: string;
  cnh: string;
  companhiaSecao: string;
  veiculo: string;
  situacao: string;
  checkInStatus: 'checked-in' | 'checked-out' | 'pending' | 'absent';
  checkInTime?: string;
  checkOutTime?: string;
  profileImage?: string;
  qrCode: string;
}

const ParticipantsPage: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setParticipants([
        {
          id: '1',
          nomeCompleto: 'Coronel João Silva Santos',
          postoGrad: 'Coronel',
          funcao: 'Comandante de Batalhão',
          cnh: '12345678901',
          companhiaSecao: 'Comando',
          veiculo: 'ABC-1234 - Ford Ranger',
          situacao: 'Ativo',
          checkInStatus: 'checked-in',
          checkInTime: '07:30',
          qrCode: 'QR001'
        },
        {
          id: '2',
          nomeCompleto: 'Major Ana Carolina Lima',
          postoGrad: 'Major',
          funcao: 'Oficial de Operações',
          cnh: '98765432109',
          companhiaSecao: '1ª Companhia',
          veiculo: 'DEF-5678 - Toyota Hilux',
          situacao: 'Ativo',
          checkInStatus: 'pending',
          qrCode: 'QR002'
        },
        {
          id: '3',
          nomeCompleto: 'Capitão Pedro Oliveira Costa',
          postoGrad: 'Capitão',
          funcao: 'Comandante de Companhia',
          cnh: '11122233344',
          companhiaSecao: '2ª Companhia',
          veiculo: 'GHI-9012 - Chevrolet S10',
          situacao: 'Ativo',
          checkInStatus: 'checked-out',
          checkInTime: '08:15',
          checkOutTime: '16:45',
          qrCode: 'QR003'
        },
        {
          id: '4',
          nomeCompleto: 'Sargento Carlos Eduardo Rocha',
          postoGrad: 'Sargento',
          funcao: 'Instrutor de Tiro',
          cnh: '55566677788',
          companhiaSecao: '3ª Companhia',
          veiculo: 'JKL-3456 - Volkswagen Amarok',
          situacao: 'Licença',
          checkInStatus: 'absent',
          qrCode: 'QR004'
        },
        {
          id: '5',
          nomeCompleto: 'Tenente Fernanda Rodrigues',
          postoGrad: '1º Tenente',
          funcao: 'Oficial de Inteligência',
          cnh: '99988877766',
          companhiaSecao: 'G-2',
          veiculo: 'MNO-7890 - Nissan Frontier',
          situacao: 'Ativo',
          checkInStatus: 'pending',
          qrCode: 'QR005'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.postoGrad.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.funcao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.companhiaSecao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || participant.checkInStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked-in': return 'bg-green-600 text-white';
      case 'checked-out': return 'bg-blue-600 text-white';
      case 'pending': return 'bg-yellow-600 text-white';
      case 'absent': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'checked-in': return 'Presente';
      case 'checked-out': return 'Saiu';
      case 'pending': return 'Aguardando';
      case 'absent': return 'Ausente';
      default: return 'N/A';
    }
  };

  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case 'Ativo': return 'border-green-500 text-green-400 bg-green-900/20';
      case 'Licença': return 'border-yellow-500 text-yellow-400 bg-yellow-900/20';
      case 'Férias': return 'border-blue-500 text-blue-400 bg-blue-900/20';
      case 'Afastado': return 'border-red-500 text-red-400 bg-red-900/20';
      case 'Inativo': return 'border-gray-500 text-gray-400 bg-gray-900/20';
      case 'Dispensado': return 'border-purple-500 text-purple-400 bg-purple-900/20';
      default: return 'border-gray-500 text-gray-400 bg-gray-900/20';
    }
  };



  const handleSaveParticipant = (participantData: any) => {
    // Converter os dados do modal para o formato do Participant
    const newParticipant: Participant = {
      id: participantData.id.toString(),
      nomeCompleto: participantData.nomeCompleto,
      postoGrad: participantData.postoGrad,
      funcao: participantData.funcao,
      cnh: participantData.cnh,
      companhiaSecao: participantData.companhiaSecao,
      veiculo: participantData.veiculo,
      situacao: participantData.situacao,
      checkInStatus: 'pending',
      profileImage: participantData.profileImage,
      qrCode: `QR-${participantData.id}`
    };

    // Adicionar à lista de participantes
    setParticipants(prev => [...prev, newParticipant]);
    
    // Mostrar mensagem de sucesso
    alert(`Participante ${newParticipant.nomeCompleto} adicionado com sucesso!`);
  };

  const handleEditParticipant = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsEditModalOpen(true);
  };

  const handleShowQR = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsQRModalOpen(true);
  };

  const handleDeleteParticipant = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedParticipant) {
      setParticipants(prev => prev.filter(p => p.id !== selectedParticipant.id));
      setIsDeleteModalOpen(false);
      setSelectedParticipant(null);
      alert(`Militar ${selectedParticipant.nomeCompleto} removido com sucesso!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Militares Cadastrados</h1>
          <p className="text-gray-400">Gerencie todos os militares do evento FortAccess</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary"
        >
          + Novo Militar
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-500">
            {participants.filter(p => p.checkInStatus === 'checked-in').length}
          </div>
          <div className="text-gray-400 text-sm">Presentes</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-500">
            {participants.filter(p => p.checkInStatus === 'checked-out').length}
          </div>
          <div className="text-gray-400 text-sm">Saíram</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-500">
            {participants.filter(p => p.checkInStatus === 'pending').length}
          </div>
          <div className="text-gray-400 text-sm">Aguardando</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-500">
            {participants.filter(p => p.checkInStatus === 'absent').length}
          </div>
          <div className="text-gray-400 text-sm">Ausentes</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por nome, posto, função ou companhia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field"
          >
            <option value="all">Todos os Status</option>
            <option value="checked-in">Presente no Evento</option>
            <option value="checked-out">Saiu do Evento</option>
            <option value="pending">Aguardando Entrada</option>
            <option value="absent">Ausente</option>
          </select>
        </div>
      </div>

      {/* Participants List */}
      <div className="card">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Carregando militares cadastrados...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Nome</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Posto/Grad</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Função</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Companhia/Seção</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Presença</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Entrada</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Saída</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant) => (
                  <tr key={participant.id} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-4 px-4">
                      <div>
                        <div className="text-white font-medium">{participant.nomeCompleto}</div>
                        <div className="text-gray-400 text-sm">CNH: {participant.cnh || 'N/A'}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{participant.postoGrad}</td>
                    <td className="py-4 px-4 text-gray-300">{participant.funcao}</td>
                    <td className="py-4 px-4 text-gray-300">{participant.companhiaSecao}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(participant.checkInStatus)}`}>
                        {getStatusText(participant.checkInStatus)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-300">
                      {participant.checkInTime || '-'}
                    </td>
                    <td className="py-4 px-4 text-gray-300">
                      {participant.checkOutTime || '-'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditParticipant(participant)}
                          className="text-cyan-400 hover:text-cyan-300 text-sm" 
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleShowQR(participant)}
                          className="text-primary-400 hover:text-primary-300 text-sm" 
                          title="Ver QR Code"
                        >
                          <Smartphone size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteParticipant(participant)}
                          className="text-red-400 hover:text-red-300 text-sm" 
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredParticipants.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">Nenhum participante encontrado</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de Criação de Participante */}
      <CreateParticipantModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveParticipant}
      />

      {/* Modal de Edição */}
      {isEditModalOpen && selectedParticipant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-cyan-500/30 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Edit size={16} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-cyan-400">EDITAR MILITAR</h2>
              </div>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedParticipant(null);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Coluna Esquerda - Formulário Principal */}
                <div className="lg:col-span-2 space-y-6">{/* Nome Completo */}
                  <div>
                    <label className="block text-cyan-400 text-sm font-medium mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedParticipant.nomeCompleto}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      placeholder="Digite o nome completo"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Posto/Grad */}
                    <div>
                      <label className="block text-cyan-400 text-sm font-medium mb-2">
                        Posto/Grad *
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedParticipant.postoGrad}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>

                    {/* Função */}
                    <div>
                      <label className="block text-cyan-400 text-sm font-medium mb-2">
                        Função *
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedParticipant.funcao}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* CNH */}
                    <div>
                      <label className="block text-cyan-400 text-sm font-medium mb-2">
                        CNH
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedParticipant.cnh}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>

                    {/* Companhia/Seção */}
                    <div>
                      <label className="block text-cyan-400 text-sm font-medium mb-2">
                        Companhia/Seção
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedParticipant.companhiaSecao}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Veículo */}
                    <div>
                      <label className="block text-cyan-400 text-sm font-medium mb-2">
                        Veículo
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedParticipant.veiculo}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>

                    {/* Status do Militar */}
                    <div>
                      <label className="block text-cyan-400 text-sm font-medium mb-2">
                        Status do Militar
                      </label>
                      <select
                        defaultValue={selectedParticipant.situacao}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      >
                        <option value="Ativo">Presente</option>
                        <option value="Inativo">Ausente</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Coluna Direita - Upload de Foto */}
                <div className="space-y-6">
                  {/* Upload de Foto */}
                  <div className="bg-gray-700/30 border-2 border-dashed border-gray-600 rounded-xl p-6">
                    <div className="text-center">
                      <div className="relative">
                        <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto flex items-center justify-center border-4 border-gray-500 overflow-hidden">
                          {selectedParticipant.profileImage ? (
                            <img
                              src={selectedParticipant.profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Camera size={40} className="text-gray-400" />
                          )}
                        </div>
                        {selectedParticipant.profileImage && (
                          <button
                            onClick={() => {
                              // Função para remover a foto
                            }}
                            className="absolute top-0 right-1/4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      
                      <h3 className="text-cyan-400 font-semibold mt-4 mb-2">FOTO DO MILITAR</h3>
                      
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          // Handle image upload
                        }}
                        className="hidden"
                        id="photo-upload-edit"
                      />
                      <label
                        htmlFor="photo-upload-edit"
                        className="inline-flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                      >
                        <Upload size={16} />
                        <span>Alterar Foto</span>
                      </label>
                      
                      <p className="text-gray-400 text-xs mt-2">
                        Formatos aceitos: JPG, PNG<br />
                        Tamanho máximo: 2MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 p-6 border-t border-gray-700">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedParticipant(null);
                }}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedParticipant(null);
                  alert('Dados atualizados com sucesso!');
                }}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de QR Code */}
      {isQRModalOpen && selectedParticipant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-cyan-500/30 max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-cyan-400">QR Code de Acesso</h2>
              <button
                onClick={() => {
                  setIsQRModalOpen(false);
                  setSelectedParticipant(null);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 text-center">
              <div className="mb-4">
                <h3 className="text-white font-semibold">{selectedParticipant.nomeCompleto}</h3>
                <p className="text-gray-400 text-sm">{selectedParticipant.postoGrad} - {selectedParticipant.funcao}</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg mb-4 mx-auto w-fit">
                <div className="w-48 h-48 bg-gray-200 rounded flex items-center justify-center">
                  <QrCode size={120} className="text-gray-600" />
                </div>
              </div>
              
              <div className="text-center text-gray-300 text-sm mb-4">
                <p>Código: <span className="font-mono text-cyan-400">{selectedParticipant.qrCode}</span></p>
                <p className="mt-2">Use este QR Code para acesso rápido ao evento</p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => alert('QR Code salvo!')}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Baixar QR Code
                </button>
                <button
                  onClick={() => alert('QR Code impresso!')}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {isDeleteModalOpen && selectedParticipant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-red-500/30 max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="text-red-400" size={24} />
                <h2 className="text-xl font-bold text-red-400">Confirmar Exclusão</h2>
              </div>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedParticipant(null);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <p className="text-white mb-2">
                  Tem certeza que deseja excluir o militar:
                </p>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-cyan-400 font-semibold">{selectedParticipant.nomeCompleto}</p>
                  <p className="text-gray-300 text-sm">{selectedParticipant.postoGrad} - {selectedParticipant.funcao}</p>
                </div>
                <p className="text-red-400 text-sm mt-3">
                  ⚠️ Esta ação não pode ser desfeita!
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedParticipant(null);
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Excluir Militar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantsPage;
