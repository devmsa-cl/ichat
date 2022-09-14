require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const { Server } = require('socket.io');
const server = require('http').createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:*',
      'http://192.168.1.3:*',
      '192.168.1.3:3000',
      '192.168.1.3:*',
      '192.168.1.3:80',
      '*',
    ],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
    methods: ['POST', 'GET'],
  },
});

//
const {
  joinUser,
  getCurrentUser,
  getChatUsers,
  userLeave,
  updateSocketId,
  getCurrentUserById,
} = require('./utils/user');

// socket io

io.on('connection', (socket) => {
  socket.emit('open-connection');

  socket.on('join', ({ user }) => {
    // if user already exists
    let curUser = getCurrentUserById(user.id, user.room);
    if (curUser) {
      updateSocketId(user.id, socket.id, user.room);
    } else {
      curUser = joinUser(user, socket.id, user.room);
    }

    socket.join(user.room);
    // all users from the room
    const users = getChatUsers(user.room);

    // send a joined message
    socket.emit('message', { user: curUser, message: 'You have joined.' });

    // send message to all client for new joined user
    socket.broadcast.to(user.room).emit('userJoined', {
      user: { user: 'Bot' },
      message: `${curUser.username} has joined.`,
    });

    io.to(user.room).emit('chatUsers', { users: users });
  });

  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('chatMessage', { user: user, message: msg });
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (!user) return;
    const users = getChatUsers(user.room);

    io.to(user.room).emit('chatUsers', { users: users });

    socket.broadcast.to(user.room).emit('message', {
      user: user,
      message: `${user.username} has left the chat.`,
    });
  });
});

if (process.env.ENVIRONMENT !== 'dev') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
}

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

if (process.env.ENVIRONMENT == 'pro') {
  console.log('hello');
  server.use(express.static(path.join(__dirname, '..', 'client', 'build')));
}

const port = process.env.ENVIRONMENT === 'dev' ? process.env.PORT : 80;

server.listen(port, () => {
  console.log('server has started on port ' + port);
});
