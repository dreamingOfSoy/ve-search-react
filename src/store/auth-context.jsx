import React, { useState, useEffect } from 'react';
import useRequest from '../hooks/use-request';

const AuthContext = React.createContext({
  isLoggedIn: false,
  userDetails: {},
  setIsLoggedIn: () => {},
  setLoginDetailsHandler: () => {},
  isLoading: false,
});

export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const { isLoading, sendRequest } = useRequest();

  useEffect(() => {
    const reciever = data => {
      data && setIsLoggedIn(true);
      data &&
        setUserDetails(prevState => {
          return { ...prevState, user: data.data.user };
        });
    };

    sendRequest({ url: '/api/v1/users/whoami' }, reciever);
  }, [sendRequest]);

  const setIsLoggedInHandler = () => {
    setIsLoggedIn(true);
  };

  const contextValue = {
    isLoggedIn,
    userDetails,
    setIsLoggedInHandler,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
