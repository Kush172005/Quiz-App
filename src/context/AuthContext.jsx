import React, { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            setIsAuthenticated(false);
            return;
        }
        getUser({ accessToken: token })
            .then((response) => response.json())
            .then(({ user }) => {
                setUser(user);
                setIsAuthenticated(true);
            })
            .catch(() => setIsAuthenticated(false));
    }, []);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
