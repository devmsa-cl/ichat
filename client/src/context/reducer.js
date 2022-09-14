const reducer = (state, action) => {
  const { type, payload } = action;
  if (type === 'LOGIN_USER') {
    const { user } = payload;
    return {
      ...state,
      user: {
        id: user.id,
        username: user.username,
        room: user.room,
      },
    };
  }
  if (type === 'LOGOUT_USER') {
    return {
      ...state,
      user: {
        username: '',
        id: '',
        room: '',
      },
    };
  }
  return new Error('Action no found!');
};

export default reducer;
