import React, { useState } from 'react';
import { AlertTriangle, FileSpreadsheet, FileText, TrendingUp } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedEvent, setSelectedEvent] = useState('all');

  const reportData = {
    totalMilitares: 89,
    checkedIn: 34,
    pending: 55,
    averageCheckInTime: '7:45',
    peakHour: '07:30-08:30',
    checkInsByHour: [
      { hour: '07:00', count: 5 },
      { hour: '07:30', count: 12 },
      { hour: '08:00', count: 8 },
      { hour: '08:30', count: 6 },
      { hour: '09:00', count: 3 },
      { hour: '09:30', count: 0 },
      { hour: '10:00', count: 0 },
      { hour: '10:30', count: 0 }
    ],
    eventStats: [
      { event: 'Evento Militar - FortAccess', registered: 89, checkedIn: 34, rate: 38.2 }
    ],
    militaresPorPosto: [
      { posto: 'Coronel', count: 1 },
      { posto: 'Major', count: 1 },
      { posto: 'Capitão', count: 1 },
      { posto: '1º Tenente', count: 1 },
      { posto: 'Sargento', count: 1 }
    ]
  };

  const maxCheckIns = Math.max(...reportData.checkInsByHour.map(h => h.count));

  const exportReport = (format: string) => {
    alert(`Exportando relatório em formato ${format}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Relatórios Militares</h1>
          <p className="text-gray-400">Análise detalhada do evento e participação militar</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => exportReport('PDF')}
            className="btn-secondary"
          >
            📄 PDF
          </button>
          <button 
            onClick={() => exportReport('Excel')}
            className="btn-secondary flex items-center"
          >
            <FileSpreadsheet size={16} className="mr-2" />
            Excel
          </button>
          <button 
            onClick={() => exportReport('CSV')}
            className="btn-primary flex items-center"
          >
            <FileText size={16} className="mr-2" />
            CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Período
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="input-field w-full"
            >
              <option value="today">Hoje</option>
              <option value="yesterday">Ontem</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mês</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Evento
            </label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="input-field w-full"
            >
              <option value="all">Todos os Eventos</option>
              <option value="1">Tech Conference 2024</option>
              <option value="2">Workshop AI</option>
              <option value="3">Meetup Developers</option>
              <option value="4">Seminário Digital</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-500 mb-2">
            {reportData.totalMilitares.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Total de Militares</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-500 mb-2">
            {reportData.checkedIn.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Presentes no Evento</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-500 mb-2">
            {reportData.pending.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Aguardando Entrada</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-500 mb-2">
            {Math.round((reportData.checkedIn / reportData.totalMilitares) * 100)}%
          </div>
          <div className="text-gray-400 text-sm">Taxa de Comparecimento</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Check-ins por Horário */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-6">Check-ins por Horário</h3>
          <div className="space-y-4">
            {reportData.checkInsByHour.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-16 text-gray-400 text-sm font-medium">{item.hour}</div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-700 rounded-full h-4 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-primary-400 h-4 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(item.count / maxCheckIns) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-right text-white font-semibold">{item.count}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Pico de movimento: {reportData.peakHour}</span>
              <span>Média: {reportData.averageCheckInTime}</span>
            </div>
          </div>
        </div>

        {/* Taxa de Comparecimento por Evento */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-6">Taxa de Comparecimento por Evento</h3>
          <div className="space-y-4">
            {reportData.eventStats.map((event, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium text-sm">{event.event}</span>
                  <span className="text-primary-400 font-semibold">{event.rate}%</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${event.rate}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{event.checkedIn} check-ins</span>
                  <span>{event.registered} inscritos</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Detalhes por Evento</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Evento</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Inscritos</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Check-ins</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Pendentes</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Taxa</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData.eventStats.map((event, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-4 px-4 text-white font-medium">{event.event}</td>
                  <td className="py-4 px-4 text-gray-300">{event.registered}</td>
                  <td className="py-4 px-4 text-green-400 font-medium">{event.checkedIn}</td>
                  <td className="py-4 px-4 text-yellow-400">{event.registered - event.checkedIn}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.rate >= 80 ? 'bg-green-600 text-white' :
                      event.rate >= 60 ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {event.rate}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-600 text-white">
                      Ativo
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
