import { io } from 'socket.io-client';

export type SocketIoAvaliableEventRecord = {
  action:
    | { action: 'join'; data?: never }
    | { action: 'exit'; data?: never }
    | { action: 'wait'; data?: never }
    | { action: 'typeing'; data?: never }
    | { action: 'avatar'; data: string }
    | { action: 'count'; data: number };
  message: string;
};

export const socket = io('http://3.36.66.17', { transports: ['websocket'] });

export const socketJoin = () => {
  console.log('조인');
  socket.emit('action', { action: 'join', data: undefined });
};

export const socketExit = () => {
  console.log('엑시트');
  socket.emit('action', { action: 'exit', data: undefined });
};
export const socketCount = () => {
  socket.emit('action', { action: 'count', data: undefined });
};

export const socketAvatar = (avatar: string | null) => {
  socket.emit('action', { action: 'avatar', data: avatar });
  console.log('아바타 보내기 완료');
};

export const socketTyping = () => {
  socket.emit('action', { action: 'typing', data: undefined });
};

export const socketChat = (msg: string) => {
  socket.emit('message', msg);
};
