import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    // const socket = io('https://aspire.rightpe.com/');
    const socket = io('http://localhost:9000');

    

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);