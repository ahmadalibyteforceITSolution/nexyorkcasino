import { io } from 'socket.io-client';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const defaultUrl = isLocal ? 'http://localhost:5000' : window.location.origin;
const socketUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : defaultUrl;
const socket = io(socketUrl);

export default socket;
