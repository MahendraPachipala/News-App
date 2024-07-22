import React, { useEffect, useState, createContext, useContext } from 'react';
import { auth } from './firebase';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrUser(user);
            setLoading(false);
        });

        return unsubscribe; 
    }, []);

    if (loading) {
        return 
    }

    return (
        <AuthContext.Provider value={{ currUser }}>
            {children}
        </AuthContext.Provider>
    );
}
