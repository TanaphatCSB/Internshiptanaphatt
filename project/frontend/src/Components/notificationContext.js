import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [highlightedDetails, setHighlightedDetails] = useState(null);

    return (
        <NotificationContext.Provider value={{ highlightedDetails, setHighlightedDetails }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => useContext(NotificationContext);
