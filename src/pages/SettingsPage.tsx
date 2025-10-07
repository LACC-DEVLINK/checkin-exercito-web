import React, { useState } from 'react';
import { HardDrive, RotateCcw, Bell, Settings, Lock, Smartphone, AlertTriangle } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      checkInAlerts: true,
      dailyReports: false
    },
    system: {
      autoBackup: true,
      offlineMode: false,
      darkMode: true,
      language: 'pt-BR'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      ipWhitelist: false
    },
    evento: {
      allowMultiple: false,
      requirePhoto: true,
      autoCheckOut: true,
      checkOutTime: '17:00',
      verificarCNH: true,
      verificarVeiculo: false
    }
  });

  const handleToggle = (section: string, key: string) => {
    setSettings(prev => {
      const sectionData = prev[section as keyof typeof prev] as any;
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [key]: !sectionData[key]
        }
      };
    });
  };

  const handleSelectChange = (section: string, key: string, value: string) => {
    setSettings(prev => {
      const sectionData = prev[section as keyof typeof prev] as any;
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [key]: value
        }
      };
    });
  };

  const exportBackup = () => {
    window.alert('Backup exportado com sucesso!');
  };

  const resetSettings = () => {
    if (window.confirm('Tem certeza que deseja restaurar as configurações padrão?')) {
      window.alert('Configurações restauradas!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Configurações do Sistema</h1>
          <p className="text-gray-400">Configurações do evento militar e sistema FortAccess</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={exportBackup}
            className="btn-secondary flex items-center"
          >
            <HardDrive size={16} className="mr-2" />
            Backup
          </button>
          <button 
            onClick={resetSettings}
            className="btn-primary flex items-center"
          >
            <RotateCcw size={16} className="mr-2" />
            Restaurar Padrão
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notificações */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Bell size={20} className="mr-2" />
            Notificações
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Notificações por E-mail</div>
                <div className="text-gray-400 text-sm">Receber alertas importantes por e-mail</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={() => handleToggle('notifications', 'email')}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${
                  settings.notifications.email ? 'bg-primary-600' : 'bg-gray-600'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.notifications.email ? 'translate-x-5' : 'translate-x-0'
                  } mt-0.5 ml-0.5`}></div>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Push Notifications</div>
                <div className="text-gray-400 text-sm">Notificações em tempo real</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={() => handleToggle('notifications', 'push')}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${
                  settings.notifications.push ? 'bg-primary-600' : 'bg-gray-600'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.notifications.push ? 'translate-x-5' : 'translate-x-0'
                  } mt-0.5 ml-0.5`}></div>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Alertas de Check-in</div>
                <div className="text-gray-400 text-sm">Notificar quando alguém fizer check-in</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.checkInAlerts}
                  onChange={() => handleToggle('notifications', 'checkInAlerts')}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${
                  settings.notifications.checkInAlerts ? 'bg-primary-600' : 'bg-gray-600'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.notifications.checkInAlerts ? 'translate-x-5' : 'translate-x-0'
                  } mt-0.5 ml-0.5`}></div>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Relatórios Diários</div>
                <div className="text-gray-400 text-sm">Receber resumo diário por e-mail</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.dailyReports}
                  onChange={() => handleToggle('notifications', 'dailyReports')}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${
                  settings.notifications.dailyReports ? 'bg-primary-600' : 'bg-gray-600'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.notifications.dailyReports ? 'translate-x-5' : 'translate-x-0'
                  } mt-0.5 ml-0.5`}></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Sistema */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Settings size={20} className="mr-2" />
            Sistema
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Backup Automático</div>
                <div className="text-gray-400 text-sm">Fazer backup dos dados automaticamente</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.system.autoBackup}
                  onChange={() => handleToggle('system', 'autoBackup')}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${
                  settings.system.autoBackup ? 'bg-primary-600' : 'bg-gray-600'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.system.autoBackup ? 'translate-x-5' : 'translate-x-0'
                  } mt-0.5 ml-0.5`}></div>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Modo Offline</div>
                <div className="text-gray-400 text-sm">Permitir funcionamento sem internet</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.system.offlineMode}
                  onChange={() => handleToggle('system', 'offlineMode')}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${
                  settings.system.offlineMode ? 'bg-primary-600' : 'bg-gray-600'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.system.offlineMode ? 'translate-x-5' : 'translate-x-0'
                  } mt-0.5 ml-0.5`}></div>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Idioma do Sistema</label>
              <select
                value={settings.system.language}
                onChange={(e) => handleSelectChange('system', 'language', e.target.value)}
                className="input-field w-full"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
