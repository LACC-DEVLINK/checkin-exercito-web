import React, { useState } from 'react';
import { Calendar, MapPin, Users, BarChart3 } from 'lucide-react';

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
  const [currentEvent] = useState<Event>({
    id: '1',
    name: 'Evento Militar - FortAccess',
    description: 'Sistema de controle de acesso e gerenciamento de participantes para evento militar.',
    date: '2025-10-15',
    time: '08:00',
    location: 'Base Militar - Forte de Copacabana',
    capacity: 200,
    registered: 89,
    checkedIn: 34,
    status: 'active'
  });

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
          <h1 className="text-2xl font-bold text-white">{currentEvent.name}</h1>
          <p className="text-gray-400">{currentEvent.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            title="Relatório do Evento"
          >
            <BarChart3 size={20} />
          </button>
          <span className={`${getStatusColor(currentEvent.status)} text-white px-4 py-2 rounded-full text-sm font-medium`}>
            {getStatusText(currentEvent.status)}
          </span>
        </div>
      </div>

      {/* Event Info Card */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center text-gray-300">
            <Calendar size={20} className="mr-3 text-cyan-400" />
            <div>
              <div className="font-medium text-white">{formatDate(currentEvent.date)}</div>
              <div className="text-sm text-gray-400">{currentEvent.time}</div>
            </div>
          </div>
          <div className="flex items-center text-gray-300">
            <MapPin size={20} className="mr-3 text-cyan-400" />
            <div>
              <div className="font-medium text-white">Local</div>
              <div className="text-sm text-gray-400">{currentEvent.location}</div>
            </div>
          </div>
          <div className="flex items-center text-gray-300">
            <Users size={20} className="mr-3 text-cyan-400" />
            <div>
              <div className="font-medium text-white">Capacidade</div>
              <div className="text-sm text-gray-400">{currentEvent.capacity} pessoas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-3xl font-bold text-cyan-500">
            {currentEvent.registered}
          </div>
          <div className="text-gray-400 text-sm">Militares Cadastrados</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-500">
            {currentEvent.checkedIn}
          </div>
          <div className="text-gray-400 text-sm">Presentes</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-500">
            1
          </div>
          <div className="text-gray-400 text-sm">Saíram</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-500">
            {currentEvent.registered - currentEvent.checkedIn - 1}
          </div>
          <div className="text-gray-400 text-sm">Aguardando</div>
        </div>
      </div>

      {/* Event Management Card */}
      <div className="card">
        <h3 className="text-xl font-semibold text-white mb-6">Gerenciamento do Evento</h3>
        
        <div className="space-y-6">
          {/* Occupancy Progress */}
          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Ocupação do Evento</span>
              <span>{Math.round((currentEvent.registered / currentEvent.capacity) * 100)}% ({currentEvent.registered}/{currentEvent.capacity})</span>
            </div>
            <div className="bg-gray-700 rounded-full h-3">
              <div
                className="bg-primary-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(currentEvent.registered / currentEvent.capacity) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Check-in Progress */}
          {currentEvent.status === 'active' && (
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress do Check-in</span>
                <span>{Math.round((currentEvent.checkedIn / currentEvent.registered) * 100)}% ({currentEvent.checkedIn}/{currentEvent.registered})</span>
              </div>
              <div className="bg-gray-700 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${currentEvent.registered > 0 ? (currentEvent.checkedIn / currentEvent.registered) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            <button className="btn-primary">
              Gerenciar Participantes
            </button>
            {currentEvent.status === 'active' && (
              <button className="btn-secondary">
                Sistema de Check-in
              </button>
            )}
            <button className="btn-secondary">
              Relatórios
            </button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default EventsPage;
