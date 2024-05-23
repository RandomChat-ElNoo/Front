import { io } from 'socket.io-client';

const socket = io('https://api.vtalk.be/', { transports: ['websocket'] });

const socketJoin = () => {
  socket.emit('action', { action: 'join', data: undefined });
};

const socketExit = () => {
  socket.emit('action', { action: 'exit', data: undefined });
};

const socketCount = () => {
  socket.emit('action', { action: 'count', data: undefined });
};

const socketAvatar = avatar => {
  socket.emit('action', { action: 'avatar', data: avatar });
};

const socketTyping = () => {
  socket.emit('action', { action: 'typing', data: undefined });
};

const socketChat = msg => {
  socket.emit('message', msg);
};

/* eslint-disable-next-line no-restricted-globals */
self.onmessage = event => {
  const { action, data } = event.data;

  switch (action) {
    case 'join':
      socketJoin();

      break;
    case 'exit':
      socketExit();

      break;
    case 'count':
      socketCount();

      break;
    case 'avatar':
      socketAvatar(data);

      break;
    case 'typing':
      socketTyping();

      break;
    case 'message':
      socketChat(data);

      break;
    default:
      console.error('Unknown message action:', action);
  }
};

socket.on('action', data => {
  /* eslint-disable-next-line no-restricted-globals */
  self.postMessage(data);
});

socket.on('message', data => {
  /* eslint-disable-next-line no-restricted-globals */
  self.postMessage(data);
});
