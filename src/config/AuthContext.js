import React, { useEffect, useState, createContext, useContext } from 'react';
import { auth } from './firebase';

const AuthContext = createContext();
const DarkModeContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const useDarkMode = () => {
    return useContext(DarkModeContext);
}

export const AuthProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [darkmode, setDarkmode] = useState(() => {
        return localStorage.getItem('dark') === 'true';
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrUser(user);
            setLoading(false);
        });

        return unsubscribe; 
    }, []);

    useEffect(() => {
        localStorage.setItem('dark', darkmode);
    }, [darkmode]);

    const toggleDarkMode = () => {
        setDarkmode(prevDarkmode => !prevDarkmode);
    }

    if (loading) {
        return null; 
    }

    return (
        <AuthContext.Provider value={{ currUser }}>
            <DarkModeContext.Provider value={{ darkmode, toggleDarkMode }}>
                {children}
            </DarkModeContext.Provider>
        </AuthContext.Provider>
    );
}
