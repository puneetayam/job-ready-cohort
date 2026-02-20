import { useState, createContext } from "react";
import { login, register } from "./services/auth.api"


export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleRegister(username, email, password) {

        setLoading(true);

        let response = null;

        try {
            response = await register(username, email, password);
            setUser(response.user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

        if (response && response.user) {
            return response.user
        } else {
            return response;
        }

    }

    async function handleLogin(username, password) {

        setLoading(true);

        let response = null;
        try {
            response = await login(username, password);
            setUser(response.user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

        return response.user;
    }

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister }} >
            {children}
        </AuthContext.Provider>
    )
}