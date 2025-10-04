import React, { useState, useEffect } from 'react';
import CreateParticipantModal from '../components/CreateParticipantModal';
import { CheckCircle, Edit, Smartphone, Trash2 } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  email: string;
  accessLevel: string;
  checkInStatus: 'checked-in' | 'pending' | 'absent';
  checkInTime?: string;
  event: string;
  qrCode: string;
}

const ParticipantsPage: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setParticipants([
        {
          id: '1',
          name: 'Maria Santos Silva',
          email: 'maria.santos@email.com',
          accessLevel: 'VIP',
          checkInStatus: 'checked-in',
          checkInTime: '09:15',
          event: 'Tech Conference 2024',
          qrCode: 'QR001'
        },
        {
          id: '2',
          name: 'João Pedro Oliveira',
          email: 'joao.pedro@email.com',
          accessLevel: 'Regular',
          checkInStatus: 'pending',
          event: 'Tech Conference 2024',
          qrCode: 'QR002'
        },
        {
          id: '3',
          name: 'Ana Carolina Costa',
          email: 'ana.costa@email.com',
          accessLevel: 'Premium',
          checkInStatus: 'checked-in',
          checkInTime: '08:45',
          event: 'Workshop AI',
          qrCode: 'QR003'
        },
        {
          id: '4',
          name: 'Carlos Eduardo Lima',
          email: 'carlos.lima@email.com',
          accessLevel: 'Regular',
          checkInStatus: 'absent',
          event: 'Meetup Developers',
          qrCode: 'QR004'
        },
        {
          id: '5',
          name: 'Fernanda Rodrigues',
          email: 'fernanda.r@email.com',
          accessLevel: 'VIP',
          checkInStatus: 'checked-in',
          checkInTime: '10:30',
          event: 'Tech Conference 2024',
          qrCode: 'QR005'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || participant.checkInStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked-in': return 'bg-green-600 text-white';
      case 'pending': return 'bg-yellow-600 text-white';
      case 'absent': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'checked-in': return 'Check-in Realizado';
      case 'pending': return 'Pendente';
      case 'absent': return 'Ausente';
      default: return 'N/A';
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'VIP': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Premium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Regular': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCheckIn = (participantId: string) => {
    setParticipants(prev => prev.map(p => 
      p.id === participantId 
        ? { ...p, checkInStatus: 'checked-in' as const, checkInTime: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }
        : p
    ));
  };

  const handleSaveParticipant = (participantData: any) => {
    // Converter os dados do modal para o formato do Participant
    const newParticipant: Participant = {
      id: participantData.id.toString(),
      name: participantData.nomeCompleto,
      email: participantData.email,
      accessLevel: participantData.nivelAcesso || 'Standard',
      checkInStatus: 'pending',
      event: 'Evento Principal',
      qrCode: `QR-${participantData.id}`
    };

    // Adicionar à lista de participantes
    setParticipants(prev => [...prev, newParticipant]);
    
    // Mostrar mensagem de sucesso
    alert(`Participante ${newParticipant.name} adicionado com sucesso!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Participantes</h1>
          <p className="text-gray-400">Gerencie todos os participantes dos eventos</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary"
        >
          + Adicionar Participante
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-500">
            {participants.filter(p => p.checkInStatus === 'checked-in').length}
          </div>
          <div className="text-gray-400 text-sm">Check-ins Realizados</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-500">
            {participants.filter(p => p.checkInStatus === 'pending').length}
          </div>
          <div className="text-gray-400 text-sm">Pendentes</div>
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
              placeholder="Buscar por nome ou e-mail..."
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
            <option value="checked-in">Check-in Realizado</option>
            <option value="pending">Pendente</option>
            <option value="absent">Ausente</option>
          </select>
        </div>
      </div>

      {/* Participants List */}
      <div className="card">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Carregando participantes...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Nome</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">E-mail</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Nível</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Check-in</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant) => (
                  <tr key={participant.id} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-4 px-4">
                      <div>
                        <div className="text-white font-medium">{participant.name}</div>
                        <div className="text-gray-400 text-sm">{participant.event}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{participant.email}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getAccessLevelColor(participant.accessLevel)}`}>
                        {participant.accessLevel}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(participant.checkInStatus)}`}>
                        {getStatusText(participant.checkInStatus)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-300">
                      {participant.checkInTime || '-'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        {participant.checkInStatus === 'pending' && (
                          <button
                            onClick={() => handleCheckIn(participant.id)}
                            className="text-green-400 hover:text-green-300 text-sm"
                            title="Fazer Check-in"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        <button className="text-blue-400 hover:text-blue-300 text-sm" title="Editar">
                          <Edit size={16} />
                        </button>
                        <button className="text-primary-400 hover:text-primary-300 text-sm" title="Ver QR Code">
                          <Smartphone size={16} />
                        </button>
                        <button className="text-red-400 hover:text-red-300 text-sm" title="Excluir">
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
    </div>
  );
};

export default ParticipantsPage;
