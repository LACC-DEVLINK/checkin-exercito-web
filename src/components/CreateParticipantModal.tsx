import React, { useState } from 'react';
import { X, Camera, QrCode, Upload } from 'lucide-react';

interface CreateParticipantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (participant: any) => void;
}

const CreateParticipantModal: React.FC<CreateParticipantModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    postoGrad: '',
    funcao: '',
    cnh: '',
    companhiaSecao: '',
    veiculo: '',
    situacao: 'Ativo'
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateQRCode = () => {
    // Simular geração de QR Code
    alert('QR Code gerado com sucesso!');
  };

  const handleSave = () => {
    // Validação básica
    if (!formData.nomeCompleto || !formData.postoGrad || !formData.funcao) {
      alert('Preencha os campos obrigatórios: Nome Completo, Posto/Grad e Função');
      return;
    }

    const participant = {
      ...formData,
      id: Date.now(),
      profileImage,
      createdAt: new Date().toISOString()
    };

    onSave(participant);
    onClose();
    
    // Reset form
    setFormData({
      nomeCompleto: '',
      postoGrad: '',
      funcao: '',
      cnh: '',
      companhiaSecao: '',
      veiculo: '',
      situacao: 'Ativo'
    });
    setProfileImage(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-cyan-500/30 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">+</span>
            </div>
            <h2 className="text-2xl font-bold text-cyan-400">CADASTRO DE MILITAR</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Esquerda - Formulário Principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Nome Completo */}
              <div>
                <label className="block text-cyan-400 text-sm font-medium mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formData.nomeCompleto}
                  onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
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
                  <select
                    value={formData.postoGrad}
                    onChange={(e) => handleInputChange('postoGrad', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="">Selecione o posto/graduação</option>
                    <option value="Soldado">Soldado</option>
                    <option value="Cabo">Cabo</option>
                    <option value="Sargento">Sargento</option>
                    <option value="Subtenente">Subtenente</option>
                    <option value="Aspirante">Aspirante</option>
                    <option value="2º Tenente">2º Tenente</option>
                    <option value="1º Tenente">1º Tenente</option>
                    <option value="Capitão">Capitão</option>
                    <option value="Major">Major</option>
                    <option value="Tenente Coronel">Tenente Coronel</option>
                    <option value="Coronel">Coronel</option>
                    <option value="General de Brigada">General de Brigada</option>
                    <option value="General de Divisão">General de Divisão</option>
                    <option value="General de Exército">General de Exército</option>
                    <option value="Marechal">Marechal</option>
                  </select>
                </div>

                {/* Função */}
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Função *
                  </label>
                  <input
                    type="text"
                    value={formData.funcao}
                    onChange={(e) => handleInputChange('funcao', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="Ex: Comandante, Instrutor, Operador"
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
                    value={formData.cnh}
                    onChange={(e) => handleInputChange('cnh', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="Número da CNH"
                  />
                </div>

                {/* Companhia/Seção */}
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Companhia/Seção
                  </label>
                  <input
                    type="text"
                    value={formData.companhiaSecao}
                    onChange={(e) => handleInputChange('companhiaSecao', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="Ex: 1ª Cia, 2ª Seção"
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
                    value={formData.veiculo}
                    onChange={(e) => handleInputChange('veiculo', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="Placa e modelo do veículo"
                  />
                </div>

                {/* Status do Militar */}
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Status do Militar
                  </label>
                  <select
                    value={formData.situacao}
                    onChange={(e) => handleInputChange('situacao', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="Ativo">Presente</option>
                    <option value="Inativo">Ausente</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Coluna Direita - Upload de Foto e QR Code */}
            <div className="space-y-6">
              {/* Upload de Foto */}
              <div className="bg-gray-700/30 border-2 border-dashed border-gray-600 rounded-xl p-6">
                <div className="text-center">
                  {profileImage ? (
                    <div className="relative">
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-cyan-500"
                      />
                      <button
                        onClick={() => setProfileImage(null)}
                        className="absolute top-0 right-1/4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto flex items-center justify-center border-4 border-gray-500">
                      <Camera size={40} className="text-gray-400" />
                    </div>
                  )}
                  
                  <h3 className="text-cyan-400 font-semibold mt-4 mb-2">UPLOAD FOTO</h3>
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="inline-flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <Upload size={16} />
                    <span>Escolher Arquivo</span>
                  </label>
                  
                  <p className="text-gray-400 text-xs mt-2">
                    Formatos aceitos: JPG, PNG<br />
                    Tamanho máximo: 2MB
                  </p>
                </div>
              </div>

              {/* Geração de QR Code */}
              <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-6">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-600 rounded-lg mx-auto flex items-center justify-center border border-gray-500 mb-4">
                    <QrCode size={60} className="text-gray-400" />
                  </div>
                  
                  <button
                    onClick={generateQRCode}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <QrCode size={20} />
                    <span>GERAR QR CODE</span>
                  </button>
                  
                  <p className="text-gray-400 text-xs mt-3">
                    QR Code será gerado automaticamente após salvar o participante
                  </p>
                </div>
              </div>

              {/* Informações do Sistema */}
              <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                <h4 className="text-cyan-400 font-medium mb-3">Informações do Sistema</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Data de Cadastro:</span>
                    <span>{new Date().toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-yellow-400">Pendente</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ID:</span>
                    <span className="text-cyan-400">Auto-gerado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
            >
              Salvar Participante
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateParticipantModal;
