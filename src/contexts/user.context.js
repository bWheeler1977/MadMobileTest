import React from 'react';

export const UserContext = React.createContext({
    users: [],
    updateUser: () => {},
    getNextPage: () => {},
    isLoading: false,
    error: null
});