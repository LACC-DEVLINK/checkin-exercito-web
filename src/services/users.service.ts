import api from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPERVISOR' | 'OPERATOR';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'SUPERVISOR' | 'OPERATOR';
  isActive?: boolean;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: 'ADMIN' | 'SUPERVISOR' | 'OPERATOR';
  isActive?: boolean;
}

class UsersService {
  async getAll(): Promise<User[]> {
    const { data } = await api.get<User[]>('/users');
    return data;
  }

  async getById(id: number): Promise<User> {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  }

  async create(userData: CreateUserDto): Promise<User> {
    const { data } = await api.post<User>('/users', userData);
    return data;
  }

  async update(id: number, userData: UpdateUserDto): Promise<User> {
    const { data } = await api.patch<User>(`/users/${id}`, userData);
    return data;
  }

  async delete(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  }

  async toggleActive(id: number): Promise<User> {
    const { data } = await api.patch<User>(`/users/${id}/toggle-active`);
    return data;
  }

  async updateRole(id: number, role: 'ADMIN' | 'SUPERVISOR' | 'OPERATOR'): Promise<User> {
    const { data } = await api.patch<User>(`/users/${id}/role`, { role });
    return data;
  }

  async restore(id: number): Promise<User> {
    const { data } = await api.patch<User>(`/users/${id}/restore`);
    return data;
  }
}

const usersService = new UsersService();
export default usersService;
