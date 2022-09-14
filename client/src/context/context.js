import { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import reducer from './reducer';
const AppContext = createContext();

const user = JSON.parse(localStorage.getItem('ichat_user'));

const initialState = {
  user: {
    username: user?.username || '',
    id: user?.id || '',
    room: user?.room || '',
  },
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginUser = (username, room) => {
    const user = { id: uuidv4(), username, room };
    dispatch({ type: 'LOGIN_USER', payload: { user, room } });
    saveToLocal(user);
  };

  const saveToLocal = (user) => {
    localStorage.setItem('ichat_user', JSON.stringify(user));
  };
  const logoutUser = () => {
    // remove user from local storage
    // remove set the context user
    dispatch({ type: 'LOGOUT_USER' });
    localStorage.removeItem('ichat_user');
  };
  return (
    <AppContext.Provider value={{ ...state, loginUser, logoutUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
