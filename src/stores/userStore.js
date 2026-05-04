import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    // Attempt to load from localStorage on initialize
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    return {
      user: savedUser ? JSON.parse(savedUser) : null,
      token: savedToken || null,
    }
  },
  actions: {
    login(user, token) {
      this.user = user;
      this.token = token;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    updateBalance(newBalance) {
      if (this.user) {
        this.user.balance = newBalance;
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    }
  }
})
