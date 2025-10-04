import React, { useState } from 'react';

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  checkedIn: number;
  status: 'active' | 'upcoming' | 'completed' | 'cancelled';
  image?: string;
}

const EventsPage: React.FC = () => {
  const [events] = useState<Event[]>([
    {
      id: '1',
      name: 'Tech Conference 2024',
      description: 'A maior conferência de tecnologia do país, reunindo especialistas e inovadores.',
      date: '2024-12-15',
      time: '09:00',
      location: 'Centro de Convenções SP',
      capacity: 500,
      registered: 387,
      checkedIn: 245,
      status: 'active'
    },
    {
      id: '2',
      name: 'Workshop de Inteligência Artificial',
      description: 'Aprenda sobre IA e Machine Learning com especialistas da área.',
      date: '2024-12-20',
      time: '14:00',
      location: 'Auditório TechHub',
      capacity: 100,
      registered: 89,
      checkedIn: 0,
      status: 'upcoming'
    },
    {
      id: '3',
      name: 'Meetup Developers',
      description: 'Encontro casual de desenvolvedores para networking e troca de experiências.',
      date: '2024-11-30',
      time: '19:00',
      location: 'Coworking Innovation',
      capacity: 50,
      registered: 50,
      checkedIn: 47,
      status: 'completed'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'upcoming': return 'bg-blue-600';
      case 'completed': return 'bg-gray-600';
      case 'cancelled': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'upcoming': return 'Próximo';
      case 'completed': return 'Finalizado';
      case 'cancelled': return 'Cancelado';
      default: return 'N/A';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Eventos</h1>
          <p className="text-gray-400">Gerencie todos os seus eventos</p>
        </div>
        <button className="btn-primary">
          + Criar Novo Evento
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-500">
            {events.filter(e => e.status === 'active').length}
          </div>
          <div className="text-gray-400 text-sm">Eventos Ativos</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-500">
            {events.filter(e => e.status === 'upcoming').length}
          </div>
          <div className="text-gray-400 text-sm">Próximos</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-500">
            {events.reduce((sum, e) => sum + e.registered, 0)}
          </div>
          <div className="text-gray-400 text-sm">Total Inscritos</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-500">
            {events.reduce((sum, e) => sum + e.checkedIn, 0)}
          </div>
          <div className="text-gray-400 text-sm">Total Check-ins</div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="card hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{event.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{event.description}</p>
              </div>
              <span className={`${getStatusColor(event.status)} text-white px-2 py-1 rounded-full text-xs`}>
                {getStatusText(event.status)}
              </span>
            </div>

            {/* Event Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-300">
                <span className="mr-3">📅</span>
                <span>{formatDate(event.date)} às {event.time}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <span className="mr-3">📍</span>
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <span className="mr-3">👥</span>
                <span>{event.registered}/{event.capacity} inscritos</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Ocupação</span>
                <span>{Math.round((event.registered / event.capacity) * 100)}%</span>
              </div>
              <div className="bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full"
                  style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Check-in Status */}
            {event.status === 'active' && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Check-ins realizados</span>
                  <span>{event.checkedIn}/{event.registered}</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${event.registered > 0 ? (event.checkedIn / event.registered) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-2 pt-4 border-t border-gray-700">
              <button className="flex-1 btn-secondary text-sm">
                Ver Detalhes
              </button>
              {event.status === 'active' && (
                <button className="flex-1 btn-primary text-sm">
                  Gerenciar Check-in
                </button>
              )}
              <button className="px-3 py-2 text-gray-400 hover:text-white transition-colors">
                ⚙️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <span className="text-2xl mr-3">📊</span>
            <div className="text-left">
              <p className="text-white font-medium">Relatório de Eventos</p>
              <p className="text-gray-400 text-sm">Exportar dados completos</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <span className="text-2xl mr-3">📱</span>
            <div className="text-left">
              <p className="text-white font-medium">Scanner QR Code</p>
              <p className="text-gray-400 text-sm">Check-in em massa</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <span className="text-2xl mr-3">📧</span>
            <div className="text-left">
              <p className="text-white font-medium">Enviar Comunicado</p>
              <p className="text-gray-400 text-sm">E-mail para participantes</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
