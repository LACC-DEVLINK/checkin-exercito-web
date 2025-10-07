import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, UserX, BarChart3, UserPlus } from 'lucide-react';

interface DashboardStats {
  totalMilitares: number;
  checkedIn: number;
  pending: number;
  capacidadeEvento: number;
}

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalMilitares: 0,
    checkedIn: 0,
    pending: 0,
    capacidadeEvento: 0
  });

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setStats({
        totalMilitares: 89,
        checkedIn: 34,
        pending: 55,
        capacidadeEvento: 200
      });
    }, 1000);
  }, []);

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
      value: 1,
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
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Bem-vindo ao FortAccess</h2>
        <p className="text-primary-100">
          Sistema de controle de acesso militar. Monitore o evento e gerencie militares em tempo real.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

export default DashboardPage;
