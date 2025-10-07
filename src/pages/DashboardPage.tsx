import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, UserX, BarChart3, UserPlus, Bell, QrCode, Shield, Clock, Camera, X, AlertTriangle } from 'lucide-react';

interface DashboardStats {
  totalMilitares: number;
  checkedIn: number;
  pending: number;
  capacidadeEvento: number;
}

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

interface EntryRequest {
  id: string;
  participant: Participant;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
  location: string;
  type: 'entry' | 'exit';
}

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalMilitares: 0,
    checkedIn: 0,
    pending: 0,
    capacidadeEvento: 0
  });

  // Estados para participantes e notificações
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [entryRequests, setEntryRequests] = useState<EntryRequest[]>([]);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<EntryRequest | null>(null);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      const initialParticipants = [
        {
          id: '1',
          nomeCompleto: 'Coronel João Silva Santos',
          postoGrad: 'Coronel',
          funcao: 'Comandante de Batalhão',
          cnh: '12345678901',
          companhiaSecao: 'Comando',
          veiculo: 'ABC-1234 - Ford Ranger',
          situacao: 'Ativo',
          checkInStatus: 'checked-in' as const,
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
          checkInStatus: 'pending' as const,
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
          checkInStatus: 'checked-out' as const,
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
          checkInStatus: 'absent' as const,
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
          checkInStatus: 'pending' as const,
          qrCode: 'QR005'
        }
      ];

      setParticipants(initialParticipants);

      setStats({
        totalMilitares: initialParticipants.length,
        checkedIn: initialParticipants.filter(p => p.checkInStatus === 'checked-in').length,
        pending: initialParticipants.filter(p => p.checkInStatus === 'pending').length,
        capacidadeEvento: 200
      });
    }, 1000);
  }, []);

  // Função para simular a leitura do QR Code na entrada ou saída
  const simulateQRCodeScan = (participantId: string, type?: 'entry' | 'exit') => {
    const participant = participants.find(p => p.id === participantId);
    if (participant) {
      // Determinar o tipo da solicitação baseado no status atual se não especificado
      const requestType = type || (participant.checkInStatus === 'checked-in' ? 'exit' : 'entry');
      
      // Verificar se é válido fazer a solicitação
      const isValidRequest = 
        (requestType === 'entry' && participant.checkInStatus !== 'checked-in') ||
        (requestType === 'exit' && participant.checkInStatus === 'checked-in');
      
      if (isValidRequest) {
        const newRequest: EntryRequest = {
          id: `req_${Date.now()}`,
          participant,
          timestamp: new Date().toLocaleString('pt-BR'),
          status: 'pending',
          location: requestType === 'entry' ? 'Portão Principal - Entrada A' : 'Portão Principal - Saída B',
          type: requestType
        };
        
        setEntryRequests(prev => [...prev, newRequest]);
        setNotificationCount(prev => prev + 1);
        
        // Abrir automaticamente a notificação
        setSelectedRequest(newRequest);
        setIsNotificationModalOpen(true);
      }
    }
  };

  // Função para aprovar entrada ou saída
  const approveRequest = (requestId: string) => {
    const request = entryRequests.find(r => r.id === requestId);
    if (request) {
      const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      
      // Atualizar o status do participante
      setParticipants(prev => prev.map(p => 
        p.id === request.participant.id 
          ? { 
              ...p, 
              checkInStatus: request.type === 'entry' ? 'checked-in' as const : 'checked-out' as const,
              ...(request.type === 'entry' 
                ? { checkInTime: currentTime } 
                : { checkOutTime: currentTime }
              )
            }
          : p
      ));
      
      // Atualizar o status da solicitação
      setEntryRequests(prev => prev.map(r => 
        r.id === requestId 
          ? { ...r, status: 'approved' as const }
          : r
      ));
      
      setNotificationCount(prev => Math.max(0, prev - 1));
      setIsNotificationModalOpen(false);
      setSelectedRequest(null);

      // Atualizar stats
      if (request.type === 'entry') {
        setStats(prev => ({
          ...prev,
          checkedIn: prev.checkedIn + 1,
          pending: Math.max(0, prev.pending - 1)
        }));
      } else {
        setStats(prev => ({
          ...prev,
          checkedIn: Math.max(0, prev.checkedIn - 1)
        }));
      }
    }
  };

  // Função para rejeitar entrada ou saída
  const rejectRequest = (requestId: string, reason?: string) => {
    setEntryRequests(prev => prev.map(r => 
      r.id === requestId 
        ? { ...r, status: 'rejected' as const }
        : r
    ));
    
    setNotificationCount(prev => Math.max(0, prev - 1));
    setIsNotificationModalOpen(false);
    setSelectedRequest(null);
  };

  // Simular leituras de QR Code automaticamente (para demonstração)
  useEffect(() => {
    const interval = setInterval(() => {
      const availableParticipants = participants.filter(p => 
        p.checkInStatus === 'pending' || p.checkInStatus === 'absent' || p.checkInStatus === 'checked-in'
      );
      
      if (availableParticipants.length > 0 && Math.random() > 0.85) {
        const randomParticipant = availableParticipants[Math.floor(Math.random() * availableParticipants.length)];
        // Simular entrada ou saída baseado no status atual
        const requestType = randomParticipant.checkInStatus === 'checked-in' ? 'exit' : 'entry';
        simulateQRCodeScan(randomParticipant.id, requestType);
      }
    }, 12000); // A cada 12 segundos, chance de simular uma leitura

    return () => clearInterval(interval);
  }, [participants]);

  // Função para mostrar todas as notificações
  const showAllNotifications = () => {
    setIsNotificationModalOpen(true);
  };

  const statCards = [
    {
      title: 'Militares Cadastrados',
      value: stats.totalMilitares,
      icon: Users,
      color: 'bg-cyan-600',
      change: '+12%'
    },
    {
      title: 'Presentes no Evento',
      value: stats.checkedIn,
      icon: CheckCircle,
      color: 'bg-green-600',
      change: '+8%'
    },
    {
      title: 'Saíram do Evento',
      value: participants.filter(p => p.checkInStatus === 'checked-out').length,
      icon: UserX,
      color: 'bg-blue-600',
      change: '+1'
    },
    {
      title: 'Aguardando Entrada',
      value: stats.pending,
      icon: UserPlus,
      color: 'bg-yellow-600',
      change: '+5%'
    }
  ];

  const recentActivity = [
    { time: '16:45', user: 'Capitão Pedro Oliveira Costa', action: 'Saída do evento', event: 'Evento Militar - FortAccess' },
    { time: '08:15', user: 'Capitão Pedro Oliveira Costa', action: 'Entrada no evento', event: 'Evento Militar - FortAccess' },
    { time: '07:45', user: 'Coronel João Silva Santos', action: 'Entrada no evento', event: 'Evento Militar - FortAccess' },
    { time: '07:42', user: 'Major Ana Carolina Lima', action: 'Cadastro atualizado', event: 'Evento Militar - FortAccess' },
    { time: '07:30', user: 'Sargento Carlos Eduardo Rocha', action: 'Veículo registrado', event: 'Evento Militar - FortAccess' },
  ];

  return (
    <div className="space-y-6">
      {/* Header com Notificações */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard FortAccess</h1>
          <p className="text-gray-400">Sistema de controle de acesso militar em tempo real</p>
        </div>
        
        {/* Botão de Notificações */}
        <button 
          onClick={showAllNotifications}
          className="relative bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <Bell size={20} />
          <span className="hidden sm:inline">Central de Autorização</span>
          {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
              {notificationCount}
            </span>
          )}
        </button>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Bem-vindo ao FortAccess</h2>
        <p className="text-primary-100">
          Sistema de controle de acesso militar. Monitore o evento e gerencie militares em tempo real.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="card hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {card.value.toLocaleString()}
                </p>
                <p className="text-green-400 text-sm mt-1">{card.change}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
        
        {/* Card de Simulação de QR */}
        <div className="card bg-gradient-to-br from-purple-600 to-blue-600 hover:shadow-xl transition-shadow">
          <button 
            onClick={() => {
              const availableParticipants = participants.filter(p => 
                p.checkInStatus === 'pending' || p.checkInStatus === 'absent' || p.checkInStatus === 'checked-in'
              );
              if (availableParticipants.length > 0) {
                const randomParticipant = availableParticipants[Math.floor(Math.random() * availableParticipants.length)];
                const requestType = randomParticipant.checkInStatus === 'checked-in' ? 'exit' : 'entry';
                simulateQRCodeScan(randomParticipant.id, requestType);
              }
            }}
            className="w-full h-full flex flex-col items-center justify-center text-white hover:bg-white/10 transition-colors rounded-lg p-4"
          >
            <QrCode size={32} className="mb-2" />
            <div className="text-sm font-medium">Simular Leitura QR</div>
            <div className="text-xs opacity-75">Entrada/Saída</div>
          </button>
        </div>
      </div>

      {/* Charts and Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Check-ins Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Check-ins por Horário</h3>
          <div className="space-y-3">
            {[
              { time: '08:00', count: 45, max: 120 },
              { time: '09:00', count: 89, max: 120 },
              { time: '10:00', count: 120, max: 120 },
              { time: '11:00', count: 76, max: 120 },
              { time: '12:00', count: 32, max: 120 },
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-12 text-gray-400 text-sm">{item.time}</div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-primary-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${(item.count / item.max) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-right text-white text-sm font-medium">{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Atividades do Evento</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">
                    <span className="font-medium">{activity.user}</span> - {activity.action}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {activity.event} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <BarChart3 size={24} className="mr-3 text-white" />
            <div className="text-left">
              <p className="text-white font-medium">Gerar Relatório</p>
              <p className="text-gray-400 text-sm">Exportar dados do evento</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <UserPlus size={24} className="mr-3 text-white" />
            <div className="text-left">
              <p className="text-white font-medium">Adicionar Participante</p>
              <p className="text-gray-400 text-sm">Cadastro manual</p>
            </div>
          </button>
        </div>
      </div>

      {/* Modal de Notificações de Entrada */}
      {isNotificationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-orange-500/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Shield size={16} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-orange-400">CENTRAL DE AUTORIZAÇÃO</h2>
              </div>
              <button
                onClick={() => {
                  setIsNotificationModalOpen(false);
                  setSelectedRequest(null);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {selectedRequest ? (
              /* Notificação Individual */
              <div className="p-6">              <div className={`border rounded-lg p-4 mb-6 ${
                selectedRequest.type === 'entry' 
                  ? 'bg-yellow-900/20 border-yellow-500/30' 
                  : 'bg-orange-900/20 border-orange-500/30'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className={selectedRequest.type === 'entry' ? 'text-yellow-400' : 'text-orange-400'} size={20} />
                  <span className={`font-semibold ${selectedRequest.type === 'entry' ? 'text-yellow-400' : 'text-orange-400'}`}>
                    SOLICITAÇÃO DE {selectedRequest.type === 'entry' ? 'ENTRADA' : 'SAÍDA'} PENDENTE
                  </span>
                </div>
                <p className="text-gray-300 text-sm">
                  QR Code escaneado em: {selectedRequest.location}
                </p>
                <p className="text-gray-400 text-xs">
                  {selectedRequest.timestamp}
                </p>
              </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Informações do Militar */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="bg-gray-700/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Dados do Militar</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Nome Completo</label>
                          <div className="text-white font-medium">{selectedRequest.participant.nomeCompleto}</div>
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Posto/Graduação</label>
                          <div className="text-white">{selectedRequest.participant.postoGrad}</div>
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Função</label>
                          <div className="text-white">{selectedRequest.participant.funcao}</div>
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Companhia/Seção</label>
                          <div className="text-white">{selectedRequest.participant.companhiaSecao}</div>
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">CNH</label>
                          <div className="text-white">{selectedRequest.participant.cnh || 'N/A'}</div>
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Veículo</label>
                          <div className="text-white">{selectedRequest.participant.veiculo || 'N/A'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Foto e Ações */}
                  <div className="space-y-4">
                    <div className="bg-gray-700/30 rounded-xl p-6 text-center">
                      <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto flex items-center justify-center border-4 border-gray-500 overflow-hidden mb-4">
                        {selectedRequest.participant.profileImage ? (
                          <img
                            src={selectedRequest.participant.profileImage}
                            alt="Foto do militar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Camera size={40} className="text-gray-400" />
                        )}
                      </div>
                      <div className="text-sm text-gray-400">
                        QR Code: {selectedRequest.participant.qrCode}
                      </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="space-y-3">
                      <button
                        onClick={() => approveRequest(selectedRequest.id)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <CheckCircle size={20} />
                        <span>AUTORIZAR {selectedRequest.type === 'entry' ? 'ENTRADA' : 'SAÍDA'}</span>
                      </button>
                      
                      <button
                        onClick={() => rejectRequest(selectedRequest.id)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <X size={20} />
                        <span>NEGAR {selectedRequest.type === 'entry' ? 'ENTRADA' : 'SAÍDA'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Lista de Todas as Notificações */
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Histórico de Solicitações ({entryRequests.length})
                </h3>
                
                {entryRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell size={48} className="text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Nenhuma solicitação de entrada</p>
                    <p className="text-gray-500 text-sm">As solicitações aparecerão aqui quando alguém escanear um QR Code</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {entryRequests.reverse().map((request) => (
                      <div 
                        key={request.id} 
                        className={`p-4 rounded-lg border ${
                          request.status === 'pending' 
                            ? (request.type === 'entry' ? 'bg-yellow-900/20 border-yellow-500/30' : 'bg-orange-900/20 border-orange-500/30')
                            : request.status === 'approved'
                            ? 'bg-green-900/20 border-green-500/30'
                            : 'bg-red-900/20 border-red-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
                                {request.participant.profileImage ? (
                                  <img
                                    src={request.participant.profileImage}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Camera size={16} className="text-gray-400" />
                                )}
                              </div>
                              <div>
                                <p className="text-white font-medium">{request.participant.nomeCompleto}</p>
                                <p className="text-gray-400 text-sm">
                                  {request.participant.postoGrad} - {request.participant.funcao}
                                </p>
                                <p className={`text-xs font-medium mt-1 ${
                                  request.type === 'entry' ? 'text-yellow-400' : 'text-orange-400'
                                }`}>
                                  Solicitação de {request.type === 'entry' ? 'ENTRADA' : 'SAÍDA'}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-400">
                              <Clock size={12} className="inline mr-1" />
                              {request.timestamp} • {request.location}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {request.status === 'pending' ? (
                              <>
                                <button
                                  onClick={() => approveRequest(request.id)}
                                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                >
                                  Aprovar
                                </button>
                                <button
                                  onClick={() => rejectRequest(request.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                >
                                  Negar
                                </button>
                              </>
                            ) : (
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                request.status === 'approved' 
                                  ? 'bg-green-600 text-white' 
                                  : 'bg-red-600 text-white'
                              }`}>
                                {request.status === 'approved' ? 'Aprovado' : 'Negado'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
