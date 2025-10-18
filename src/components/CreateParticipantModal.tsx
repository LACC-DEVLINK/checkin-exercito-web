import React, { useState } from 'react';
import { X, Camera, QrCode, Upload, AlertCircle, Check } from 'lucide-react';
import militariesService from '../services/militaries.service';
import { compressImageFile, isValidImageFile } from '../utils/imageCompression';

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
  const [qrCodeData, setQrCodeData] = useState<{ code: string; image: string } | null>(null);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [qrError, setQrError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!isValidImageFile(file)) {
      alert('Por favor, selecione uma imagem válida (JPEG, PNG, GIF ou WebP)');
      return;
    }

    // Validar tamanho do arquivo (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem é muito grande. Por favor, selecione uma imagem menor que 5MB');
      return;
    }

    try {
      // Comprimir imagem antes de exibir
      const compressedBase64 = await compressImageFile(file, {
        maxWidth: 400,
        maxHeight: 400,
        quality: 0.8
      });
      
      setProfileImage(compressedBase64);
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      alert('Erro ao processar a imagem. Tente novamente.');
    }
  };

  const generateQRCode = async () => {
    // Validar campos obrigatórios antes de gerar QR Code
    if (!formData.nomeCompleto) {
      setQrError('Preencha o Nome Completo antes de gerar o QR Code');
      return;
    }
    if (!formData.postoGrad) {
      setQrError('Selecione o Posto/Grad antes de gerar o QR Code');
      return;
    }
    if (!formData.funcao) {
      setQrError('Preencha a Função antes de gerar o QR Code');
      return;
    }
    if (!formData.companhiaSecao) {
      setQrError('Selecione a Companhia/Seção antes de gerar o QR Code');
      return;
    }

    setQrError(null);
    setIsGeneratingQR(true);

    try {
      const qrData = await militariesService.generateQRCode(formData.nomeCompleto);
      setQrCodeData(qrData);
    } catch (error: any) {
      setQrError(error.response?.data?.message || 'Erro ao gerar QR Code. Tente novamente.');
    } finally {
      setIsGeneratingQR(false);
    }
  };

  const handleSave = () => {
    // Validação básica
    if (!formData.nomeCompleto || !formData.postoGrad || !formData.funcao || !formData.companhiaSecao) {
      alert('Preencha os campos obrigatórios: Nome Completo, Posto/Grad, Função e Companhia/Seção');
      return;
    }

    // Validar se QR Code foi gerado
    if (!qrCodeData) {
      alert('Gere o QR Code antes de salvar o participante');
      return;
    }

    const participant = {
      ...formData,
      qrCode: qrCodeData.code,
      qrCodeImage: qrCodeData.image,
      profileImage
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
    setQrCodeData(null);
    setQrError(null);
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
                    Companhia/Seção *
                  </label>
                  <select
                    value={formData.companhiaSecao}
                    onChange={(e) => handleInputChange('companhiaSecao', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="">Selecione uma Companhia/Seção</option>
                    
                    <optgroup label="Companhias de Infantaria">
                      <option value="1ª Companhia de Infantaria">1ª Companhia de Infantaria</option>
                      <option value="2ª Companhia de Infantaria">2ª Companhia de Infantaria</option>
                      <option value="3ª Companhia de Infantaria">3ª Companhia de Infantaria</option>
                      <option value="Companhia de Comando e Serviços do Batalhão">Companhia de Comando e Serviços do Batalhão</option>
                    </optgroup>
                    
                    <optgroup label="Companhias Especializadas">
                      <option value="Companhia de Engenharia de Combate">Companhia de Engenharia de Combate</option>
                      <option value="Companhia de Apoio de Fogo (Artilharia)">Companhia de Apoio de Fogo (Artilharia)</option>
                      <option value="Companhia de Cavalaria">Companhia de Cavalaria</option>
                      <option value="Companhia de Comunicações">Companhia de Comunicações</option>
                      <option value="Companhia de Transporte">Companhia de Transporte</option>
                    </optgroup>
                    
                    <optgroup label="Grupos de Artilharia">
                      <option value="1º Grupo de Artilharia de Campanha">1º Grupo de Artilharia de Campanha</option>
                      <option value="2º Grupo de Artilharia de Campanha">2º Grupo de Artilharia de Campanha</option>
                      <option value="Grupo de Morteiros">Grupo de Morteiros</option>
                    </optgroup>
                    
                    <optgroup label="Companhias de Apoio">
                      <option value="Companhia de Suprimento">Companhia de Suprimento</option>
                      <option value="Companhia de Saúde">Companhia de Saúde</option>
                      <option value="Companhia de Manutenção">Companhia de Manutenção</option>
                      <option value="Companhia de Intendência">Companhia de Intendência</option>
                    </optgroup>
                    
                    <optgroup label="Companhias de Escolta e Reconhecimento">
                      <option value="Companhia de Reconhecimento">Companhia de Reconhecimento</option>
                      <option value="Companhia de Polícia do Exército">Companhia de Polícia do Exército</option>
                    </optgroup>
                  </select>
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
                  <div className="w-32 h-32 bg-gray-600 rounded-lg mx-auto flex items-center justify-center border border-gray-500 mb-4 overflow-hidden">
                    {qrCodeData ? (
                      <img 
                        src={qrCodeData.image} 
                        alt="QR Code" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <QrCode size={60} className="text-gray-400" />
                    )}
                  </div>
                  
                  {qrError && (
                    <div className="mb-3 p-2 bg-red-500/20 border border-red-500 rounded text-red-400 text-xs flex items-center justify-center space-x-1">
                      <AlertCircle size={14} />
                      <span>{qrError}</span>
                    </div>
                  )}
                  
                  {qrCodeData && (
                    <div className="mb-3 p-2 bg-green-500/20 border border-green-500 rounded text-green-400 text-xs flex items-center justify-center space-x-1">
                      <Check size={14} />
                      <span>QR Code gerado com sucesso!</span>
                    </div>
                  )}
                  
                  <button
                    onClick={generateQRCode}
                    disabled={isGeneratingQR || !!qrCodeData}
                    className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                      qrCodeData 
                        ? 'bg-green-600 text-white cursor-not-allowed' 
                        : isGeneratingQR
                        ? 'bg-gray-600 text-gray-400 cursor-wait'
                        : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    }`}
                  >
                    {isGeneratingQR ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>GERANDO...</span>
                      </>
                    ) : qrCodeData ? (
                      <>
                        <Check size={20} />
                        <span>QR CODE GERADO</span>
                      </>
                    ) : (
                      <>
                        <QrCode size={20} />
                        <span>GERAR QR CODE</span>
                      </>
                    )}
                  </button>
                  
                  {qrCodeData && (
                    <p className="text-green-400 text-xs mt-3 font-mono break-all">
                      Código: {qrCodeData.code}
                    </p>
                  )}
                  
                  {!qrCodeData && (
                    <p className="text-gray-400 text-xs mt-3">
                      Preencha os campos obrigatórios e clique para gerar o QR Code
                    </p>
                  )}
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
                    <span className={qrCodeData ? 'text-green-400' : 'text-yellow-400'}>
                      {qrCodeData ? 'QR Code Gerado' : 'Pendente QR Code'}
                    </span>
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
              disabled={!qrCodeData}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                qrCodeData
                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {qrCodeData ? 'Salvar Participante' : 'Gere o QR Code para Salvar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateParticipantModal;
