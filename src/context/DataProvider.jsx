import React, { useState, createContext, useEffect } from 'react';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    
    const [formData, setFormData] = useState({ url: '', type: 'GET' })
    const [jsonText, setJsonText] = useState('');
    const [paramData, setParamData] = useState([]);
    const [headerData, setHeaderData] = useState([]);
    const [authData, setAuthData] = useState({ type: 'none', token: '', username: '', password: '' });
    
    const [history, setHistory] = useState(() => {
        try {
            const saved = localStorage.getItem('postman-history');
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('postman-history', JSON.stringify(history));
    }, [history]);

    return (
        <DataContext.Provider
            value={{
                formData, setFormData,
                jsonText, setJsonText,
                paramData, setParamData,
                headerData, setHeaderData,
                authData, setAuthData,
                history, setHistory,
                theme, setTheme
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;