import { useAppContext } from './context/context';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
const Protected = ({ children }) => {
  const { user } = useAppContext();

  if (!user.username && !user.id) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;
