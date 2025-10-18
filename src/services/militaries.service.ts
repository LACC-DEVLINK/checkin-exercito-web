import api from './api';

export interface Military {
  id: string;
  nomeCompleto: string;
  postoGrad: string;
  funcao: string;
  cnh: string | null;
  companhiaSecao: string;
  veiculo: string | null;
  situacao: string;
  profileImage: string | null;
  qrCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMilitaryDto {
  nomeCompleto: string;
  postoGrad: string;
  funcao: string;
  cnh?: string;
  companhiaSecao: string;
  veiculo?: string;
  situacao?: string;
  profileImage?: string;
}

export interface UpdateMilitaryDto {
  nomeCompleto?: string;
  postoGrad?: string;
  funcao?: string;
  cnh?: string;
  companhiaSecao?: string;
  veiculo?: string;
  situacao?: string;
  profileImage?: string;
}

class MilitariesService {
  async getAll(): Promise<Military[]> {
    const { data } = await api.get<Military[]>('/militaries');
    return data;
  }

  async getById(id: string): Promise<Military> {
    const { data } = await api.get<Military>(`/militaries/${id}`);
    return data;
  }

  async getByQRCode(qrCode: string): Promise<Military> {
    const { data } = await api.get<Military>(`/militaries/qr/${qrCode}`);
    return data;
  }

  async create(militaryData: CreateMilitaryDto): Promise<Military> {
    const { data } = await api.post<Military>('/militaries', militaryData);
    return data;
  }

  async update(id: string, militaryData: UpdateMilitaryDto): Promise<Military> {
    const { data } = await api.patch<Military>(`/militaries/${id}`, militaryData);
    return data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/militaries/${id}`);
  }
}

const militariesService = new MilitariesService();
export default militariesService;
