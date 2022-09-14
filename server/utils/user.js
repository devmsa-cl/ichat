const users = [];

exports.userLeave = (id) => {
  const index = users.findIndex((user) => user.socketId === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};
exports.getChatUsers = (room) => {
  return users.filter((u) => u.room === room);
};
exports.joinUser = (user, socketId, room) => {
  const joinedUser = {
    id: user.id,
    username: user.username,
    socketId: socketId,
    room,
  };
  users.push(joinedUser);
  return joinedUser;
};

exports.getCurrentUser = (id) => {
  return users.find((user) => user.socketId === id);
};
exports.getCurrentUserById = (id, room) => {
  return users.find((user) => user.id === id && user.room === room);
};
exports.updateSocketId = (id, socketId, room) => {
  const user = users.find((user) => user.id === id && user.room === room);

  user.socketId = socketId;
};
