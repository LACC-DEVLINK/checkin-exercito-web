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
    documento: '',
    email: '',
    instituicao: '',
    nivelAcesso: '',
    cargo: 'Convidado Especial',
    algo: 'Membro/Político',
    observacoes: '',
    // Campos do lado direito
    pagamentoOpcoes: '',
    beneficiosPossiveis: '',
    autenticidadeInformacoes: '',
    infoEspecial: '',
    especial: '',
    vagas: '',
    detalhes: ''
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
    if (!formData.nomeCompleto || !formData.email || !formData.documento) {
      alert('Preencha os campos obrigatórios: Nome, Email e Documento');
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
      documento: '',
      email: '',
      instituicao: '',
      nivelAcesso: '',
      cargo: 'Convidado Especial',
      algo: 'Membro/Político',
      observacoes: '',
      pagamentoOpcoes: '',
      beneficiosPossiveis: '',
      autenticidadeInformacoes: '',
      infoEspecial: '',
      especial: '',
      vagas: '',
      detalhes: ''
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
            <h2 className="text-2xl font-bold text-cyan-400">CADASTRO DE NOVA PESSOA</h2>
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
                {/* Documento */}
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Documento de Identidade (RG/Passaporte) *
                  </label>
                  <input
                    type="text"
                    value={formData.documento}
                    onChange={(e) => handleInputChange('documento', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="RG ou Passaporte"
                  />
                </div>

                {/* Pagamento/Opções */}
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Pagamento/Opcionais
                  </label>
                  <input
                    type="text"
                    value={formData.pagamentoOpcoes}
                    onChange={(e) => handleInputChange('pagamentoOpcoes', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="Informações de pagamento"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="email@exemplo.com"
                  />
                </div>

                {/* Benefícios Possíveis */}
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Benefícios Possíveis
                  </label>
                  <input
                    type="text"
                    value={formData.beneficiosPossiveis}
                    onChange={(e) => handleInputChange('beneficiosPossiveis', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="Benefícios disponíveis"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Instituição/Empresa */}
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Instituição/Empresa
                  </label>
                  <input
                    type="text"
                    value={formData.instituicao}
                    onChange={(e) => handleInputChange('instituicao', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="Nome da instituição"
                  />
                </div>

                {/* Autenticidade das Informações */}
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Autenticidade das informações
                  </label>
                  <input
                    type="text"
                    value={formData.autenticidadeInformacoes}
                    onChange={(e) => handleInputChange('autenticidadeInformacoes', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="Verificação de autenticidade"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nível de Acesso */}
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Nível de Acesso
                  </label>
                  <input
                    type="text"
                    value={formData.nivelAcesso}
                    onChange={(e) => handleInputChange('nivelAcesso', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="Nível de acesso"
                  />
                </div>

                {/* Informações Especiais */}
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Informações Especiais
                  </label>
                  <input
                    type="text"
                    value={formData.infoEspecial}
                    onChange={(e) => handleInputChange('infoEspecial', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="Informações especiais"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Cargo/Função */}
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Cargo/Função
                  </label>
                  <select
                    value={formData.cargo}
                    onChange={(e) => handleInputChange('cargo', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="Convidado Especial">Convidado Especial</option>
                    <option value="Palestrante">Palestrante</option>
                    <option value="Organizador">Organizador</option>
                    <option value="Participante">Participante</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>

                {/* Especial */}
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Especial
                  </label>
                  <input
                    type="text"
                    value={formData.especial}
                    onChange={(e) => handleInputChange('especial', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="Informação especial"
                  />
                </div>

                {/* Vagas */}
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Vagas
                  </label>
                  <input
                    type="text"
                    value={formData.vagas}
                    onChange={(e) => handleInputChange('vagas', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="Número de vagas"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Algo/Função */}
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Algo/Função
                  </label>
                  <select
                    value={formData.algo}
                    onChange={(e) => handleInputChange('algo', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="Membro/Político">Membro/Político</option>
                    <option value="Empresário">Empresário</option>
                    <option value="Acadêmico">Acadêmico</option>
                    <option value="Jornalista">Jornalista</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                {/* Detalhes */}
                <div>
                  <label className="block text-cyan-400 text-sm font-medium mb-2">
                    Detalhes
                  </label>
                  <input
                    type="text"
                    value={formData.detalhes}
                    onChange={(e) => handleInputChange('detalhes', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="Detalhes adicionais"
                  />
                </div>
              </div>

              {/* Observações */}
              <div>
                <label className="block text-cyan-400 text-sm font-medium mb-2">
                  Observações
                </label>
                <textarea
                  value={formData.observacoes}
                  onChange={(e) => handleInputChange('observacoes', e.target.value)}
                  rows={4}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
                  placeholder="Observações adicionais..."
                />
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
