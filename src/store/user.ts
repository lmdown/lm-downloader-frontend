import { defineStore } from 'pinia';
import axios from 'axios';

// 定义一个简单的 API 端点
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  token?: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    token: '', // 初始状态下没有 token
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await api.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    },
    setToken(token: string) {
      this.token = token;
    },
  },
});
