import { useContext } from 'react';

import { AuthContext } from './AuthProvider.jsx';

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("ok")
  console.log(context)
  console.log("ok")
  if (!context) {
    throw new Error(
      'useAuth kann nur innerhalb von AuthProvider aufgerufen werden.'
    );
  }
  return context;
};
