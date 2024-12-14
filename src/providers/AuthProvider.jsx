import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (userName, passWord) => {
        if (userName === 'user' && passWord === 'password'){
            setUser(userName);
            const loggedInUser = {userName}
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            return true;
        }
        return false;
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);