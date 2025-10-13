import React, { useState, useEffect } from 'react';
import { Users, ChevronRight, X, User, Search, Shield, Camera, Award, Settings, Target, Wrench, Eye } from 'lucide-react';

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

interface Group {
  id: string;
  name: string;
  category: string;
  participants: Participant[];
}

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      // Dados de exemplo dos participantes
      const mockParticipants: Participant[] = [
        {
          id: '1',
          nomeCompleto: 'Coronel João Silva Santos',
          postoGrad: 'Coronel',
          funcao: 'Comandante de Batalhão',
          cnh: '12345678901',
          companhiaSecao: 'Companhia de Comando e Serviços do Batalhão',
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
          funcao: 'Comandante de Companhia',
          cnh: '98765432109',
          companhiaSecao: '1ª Companhia de Infantaria',
          veiculo: 'DEF-5678 - Toyota Hilux',
          situacao: 'Ativo',
          checkInStatus: 'pending',
          qrCode: 'QR002'
        },
        {
          id: '3',
          nomeCompleto: 'Capitão Pedro Oliveira Costa',
          postoGrad: 'Capitão',
          funcao: 'Oficial de Operações',
          cnh: '11122233344',
          companhiaSecao: '2ª Companhia de Infantaria',
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
          companhiaSecao: 'Companhia de Engenharia de Combate',
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
          companhiaSecao: '1º Grupo de Artilharia de Campanha',
          veiculo: 'MNO-7890 - Nissan Frontier',
          situacao: 'Ativo',
          checkInStatus: 'pending',
          qrCode: 'QR005'
        }
      ];

      // Definir grupos organizacionais
      const organizationalGroups: Group[] = [
        // 1. Companhias de Infantaria
        {
          id: '1',
          name: '1ª Companhia de Infantaria',
          category: 'Companhias de Infantaria',
          participants: mockParticipants.filter(p => p.companhiaSecao === '1ª Companhia de Infantaria')
        },
        {
          id: '2',
          name: '2ª Companhia de Infantaria',
          category: 'Companhias de Infantaria',
          participants: mockParticipants.filter(p => p.companhiaSecao === '2ª Companhia de Infantaria')
        },
        {
          id: '3',
          name: '3ª Companhia de Infantaria',
          category: 'Companhias de Infantaria',
          participants: mockParticipants.filter(p => p.companhiaSecao === '3ª Companhia de Infantaria')
        },
        {
          id: '4',
          name: 'Companhia de Comando e Serviços do Batalhão',
          category: 'Companhias de Infantaria',
          participants: mockParticipants.filter(p => p.companhiaSecao === 'Companhia de Comando e Serviços do Batalhão')
        },

        // 2. Companhias Especializadas
        {
          id: '5',
          name: 'Companhia de Engenharia de Combate',
          category: 'Companhias Especializadas',
          participants: mockParticipants.filter(p => p.companhiaSecao === 'Companhia de Engenharia de Combate')
        },
        {
          id: '6',
          name: 'Companhia de Apoio de Fogo (Artilharia)',
          category: 'Companhias Especializadas',
          participants: []
        },
        {
          id: '7',
          name: 'Companhia de Cavalaria',
          category: 'Companhias Especializadas',
          participants: []
        },
        {
          id: '8',
          name: 'Companhia de Comunicações',
          category: 'Companhias Especializadas',
          participants: []
        },
        {
          id: '9',
          name: 'Companhia de Transporte',
          category: 'Companhias Especializadas',
          participants: []
        },

        // 3. Grupos de Artilharia
        {
          id: '10',
          name: '1º Grupo de Artilharia de Campanha',
          category: 'Grupos de Artilharia',
          participants: mockParticipants.filter(p => p.companhiaSecao === '1º Grupo de Artilharia de Campanha')
        },
        {
          id: '11',
          name: '2º Grupo de Artilharia de Campanha',
          category: 'Grupos de Artilharia',
          participants: []
        },
        {
          id: '12',
          name: 'Grupo de Morteiros',
          category: 'Grupos de Artilharia',
          participants: []
        },

        // 4. Companhias de Apoio
        {
          id: '13',
          name: 'Companhia de Suprimento',
          category: 'Companhias de Apoio',
          participants: []
        },
        {
          id: '14',
          name: 'Companhia de Saúde',
          category: 'Companhias de Apoio',
          participants: []
        },
        {
          id: '15',
          name: 'Companhia de Manutenção',
          category: 'Companhias de Apoio',
          participants: []
        },
        {
          id: '16',
          name: 'Companhia de Intendência',
          category: 'Companhias de Apoio',
          participants: []
        },

        // 5. Companhias de Escolta e Reconhecimento
        {
          id: '17',
          name: 'Companhia de Reconhecimento',
          category: 'Companhias de Escolta e Reconhecimento',
          participants: []
        },
        {
          id: '18',
          name: 'Companhia de Polícia do Exército',
          category: 'Companhias de Escolta e Reconhecimento',
          participants: []
        }
      ];

      setGroups(organizationalGroups);
      setLoading(false);
    }, 1000);
  }, []);

  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group);
    setIsGroupModalOpen(true);
  };

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Companhias de Infantaria': return Award;
      case 'Companhias Especializadas': return Settings;
      case 'Grupos de Artilharia': return Target;
      case 'Companhias de Apoio': return Wrench;
      case 'Companhias de Escolta e Reconhecimento': return Eye;
      default: return Shield;
    }
  };

  // Filtrar grupos por termo de busca
  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Agrupar por categoria
  const groupsByCategory = filteredGroups.reduce((acc, group) => {
    if (!acc[group.category]) {
      acc[group.category] = [];
    }
    acc[group.category].push(group);
    return acc;
  }, {} as Record<string, Group[]>);

  // Filtrar participantes no modal
  const filteredParticipants = selectedGroup?.participants.filter(participant =>
    participant.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.postoGrad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.funcao.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Grupos Organizacionais</h1>
          <p className="text-gray-400">Visualize e gerencie os militares por grupos organizacionais</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="flex items-center space-x-2">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Buscar grupos ou categorias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field flex-1"
          />
        </div>
      </div>

      {/* Lista de Grupos por Categoria */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Carregando grupos organizacionais...</p>
          </div>
        ) : (
          Object.entries(groupsByCategory).map(([category, categoryGroups]) => (
            <div key={category} className="card">
              <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-700">
                {React.createElement(getCategoryIcon(category), { size: 24, className: "text-cyan-400" })}
                <h2 className="text-xl font-semibold text-cyan-400">{category}</h2>
                <span className="text-gray-400 text-sm">({categoryGroups.length} grupos)</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryGroups.map((group) => (
                  <div
                    key={group.id}
                    onClick={() => handleGroupClick(group)}
                    className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 hover:bg-gray-700/50 hover:border-cyan-500/50 cursor-pointer transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield size={16} className="text-cyan-400" />
                          <h3 className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                            {group.name}
                          </h3>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Users size={14} />
                            <span>{group.participants.length} militares</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <User size={14} />
                            <span>
                              {group.participants.filter(p => p.checkInStatus === 'checked-in').length} presentes
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    
                    {/* Status Bar */}
                    <div className="mt-3 flex space-x-1">
                      {group.participants.length > 0 ? (
                        <>
                          <div className="flex-1 h-2 bg-green-600 rounded-full opacity-75"></div>
                          <div className="flex-1 h-2 bg-yellow-600 rounded-full opacity-50"></div>
                          <div className="flex-1 h-2 bg-red-600 rounded-full opacity-25"></div>
                        </>
                      ) : (
                        <div className="w-full h-2 bg-gray-600 rounded-full opacity-50"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Detalhes do Grupo */}
      {isGroupModalOpen && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-cyan-500/30 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Shield size={16} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-cyan-400">{selectedGroup.name}</h2>
                  <p className="text-gray-400 text-sm">{selectedGroup.category}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsGroupModalOpen(false);
                  setSelectedGroup(null);
                  setSearchTerm('');
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Stats do Grupo */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="card text-center">
                  <div className="text-2xl font-bold text-cyan-500">
                    {selectedGroup.participants.length}
                  </div>
                  <div className="text-gray-400 text-sm">Total</div>
                </div>
                <div className="card text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {selectedGroup.participants.filter(p => p.checkInStatus === 'checked-in').length}
                  </div>
                  <div className="text-gray-400 text-sm">Presentes</div>
                </div>
                <div className="card text-center">
                  <div className="text-2xl font-bold text-yellow-500">
                    {selectedGroup.participants.filter(p => p.checkInStatus === 'pending').length}
                  </div>
                  <div className="text-gray-400 text-sm">Aguardando</div>
                </div>
                <div className="card text-center">
                  <div className="text-2xl font-bold text-red-500">
                    {selectedGroup.participants.filter(p => p.checkInStatus === 'absent').length}
                  </div>
                  <div className="text-gray-400 text-sm">Ausentes</div>
                </div>
              </div>

              {/* Filtro de Militares */}
              <div className="mb-4">
                <div className="flex items-center space-x-2">
                  <Search size={20} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar militares neste grupo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field flex-1"
                  />
                </div>
              </div>

              {/* Lista de Militares */}
              {selectedGroup.participants.length === 0 ? (
                <div className="text-center py-8">
                  <Users size={48} className="text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">Nenhum militar cadastrado neste grupo</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Nome</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Posto/Grad</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Função</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Entrada</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredParticipants.map((participant) => (
                        <tr key={participant.id} className="border-b border-gray-700 hover:bg-gray-700">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-4">
                              {/* Foto do Militar */}
                              <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center border-2 border-gray-500 overflow-hidden flex-shrink-0">
                                {participant.profileImage ? (
                                  <img
                                    src={participant.profileImage}
                                    alt={`Foto de ${participant.nomeCompleto}`}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Camera size={20} className="text-gray-400" />
                                )}
                              </div>
                              
                              {/* Informações do Militar */}
                              <div>
                                <div className="text-white font-medium">{participant.nomeCompleto}</div>
                                <div className="text-gray-400 text-sm">CNH: {participant.cnh || 'N/A'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-300">{participant.postoGrad}</td>
                          <td className="py-4 px-4 text-gray-300">{participant.funcao}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(participant.checkInStatus)}`}>
                              {getStatusText(participant.checkInStatus)}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-300">
                            {participant.checkInTime || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {filteredParticipants.length === 0 && selectedGroup.participants.length > 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-400">Nenhum militar encontrado com esse filtro</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupsPage;
