import axios from 'axios';
import socket from '../socket';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper for authenticated requests
const authHeader = () => ({
  headers: { 'x-auth-token': localStorage.getItem('token') }
});

export const apiService = {
  // --- AUTH ---
  register: (data) => axios.post(`${API_BASE_URL}/register`, data),
  login: (data) => axios.post(`${API_BASE_URL}/login`, data),
  forgotPassword: (email) => axios.post(`${API_BASE_URL}/forgot-password`, { email }),
  resetPassword: (email, newPassword) => axios.post(`${API_BASE_URL}/reset-password`, { email, newPassword }),
  
  // --- BANKING ---
  deposit: (amount) => axios.post(`${API_BASE_URL}/deposit`, { amount }, authHeader()),
  withdraw: (data) => axios.post(`${API_BASE_URL}/withdraw`, data, authHeader()),
  transfer: (data) => axios.post(`${API_BASE_URL}/transfer`, data, authHeader()),
  claimBonus: () => axios.post(`${API_BASE_URL}/claim-bonus`, {}, authHeader()),
  buyTokens: (amount, tokens) => axios.post(`${API_BASE_URL}/buy-tokens`, { amount, tokens }, authHeader()),
  bookVip: () => axios.post(`${API_BASE_URL}/book-vip`, {}, authHeader()),
  
  // --- BETTING & GAMING ---
  placeBet: (betData) => axios.post(`${API_BASE_URL}/place-bet`, betData, authHeader()),
  getMyBets: () => axios.get(`${API_BASE_URL}/my-bets`, authHeader()),
  resolveCasinoWin: (amount) => axios.post(`${API_BASE_URL}/resolve-casino-win`, { amount }, authHeader()),
  
  // --- P2P CHALLENGES ---
  sendChallenge: (targetUsername, amount) => 
    axios.post(`${API_BASE_URL}/challenge`, { targetUsername, amount }, authHeader()),
  acceptChallenge: (challengeId) => 
    axios.post(`${API_BASE_URL}/accept-challenge`, { challengeId }, authHeader()),

  // --- SOCKET EMITS ---
  registerUserSocket: (user) => 
    socket.emit('registerUser', JSON.stringify({ id: user.id, username: user.username })),
  sendMessage: (text, username) => 
    socket.emit('sendMessage', { user: username, text }),
  broadcastBet: (betData) => 
    socket.emit('placePublicBet', betData),
};
