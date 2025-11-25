import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, logoutUser } from "../services/authService";

export function useAuth() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (credentials) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await loginUser(credentials);
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));

            // Normalizar el rol para manejar diferentes formatos
            const rol = response.user.rol.trim().toLowerCase();

            if (rol === "cuidador") {
                navigate("/dashboard-perfil-c");
            } else if (rol === "adulto_mayor" || rol === "adulto mayor") {
                navigate("/dashboard-mayor");
            } else {
                navigate("/");
            }

            return response;
        } catch (err) {
            setError(
                err.response?.data?.msg ||
                err.response?.data?.message ||
                "Error al iniciar sesión."
            );
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await registerUser(userData);
            if (data.token && data.user) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                const rol = data.user.rol.trim().toLowerCase();
                if (rol === "cuidador") {
                    navigate("/dashboard-perfil-c");
                } else if (rol === "adulto_mayor" || rol === "adulto mayor") {
                    navigate("/dashboard-mayor");
                } else {
                    navigate("/login");
                }
            }
            return data;
        } catch (err) {
            setError(
                err.response?.data?.msg ||
                err.response?.data?.message ||
                err.message ||
                "Error al registrar usuario"
            );
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        logoutUser();
        navigate("/login");
    };

    return { login, register, logout, isLoading, error, setError };
}
