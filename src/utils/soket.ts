// import { io } from 'socket.io-client';

// export type SocketIoAvaliableEventRecord = {
//   action:
//     | { action: 'join'; data?: never }
//     | { action: 'exit'; data?: never }
//     | { action: 'wait'; data?: never }
//     | { action: 'typeing'; data?: never }
//     | { action: 'avatar'; data: string }
//     | { action: 'count'; data: number };
//   message: string;
// };

// // export const socket = io('https://api.vtalk.be', { transports: ['websocket'] });
// export const socket = io('http://localhost:3001/', {
//   transports: ['websocket'],
// });

// export const socketJoin = () => {
//   socket.emit('action', { action: 'join', data: undefined });
// };

// export const socketExit = () => {
//   socket.emit('action', { action: 'exit', data: undefined });
// };
// export const socketCount = () => {
//   socket.emit('action', { action: 'count', data: undefined });
// };

// export const socketAvatar = (avatar: string | null) => {
//   socket.emit('action', { action: 'avatar', data: avatar });
// };

// export const socketTyping = () => {
//   socket.emit('action', { action: 'typing', data: undefined });
// };

// export const socketChat = (msg: string) => {
//   socket.emit('message', msg);
// };

export {};
