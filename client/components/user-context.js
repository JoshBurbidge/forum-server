import React from 'react';

export const UserContext = React.createContext({ name: 'context-stuff', user: null });
export const UserProvider = UserContext.Provider;
