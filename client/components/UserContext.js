import React from 'react';

export const UserContext = React.createContext({ username: 'default', loggedIn: true });
export const UserProvider = UserContext.Provider;
