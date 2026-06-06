import { Navigate } from "react-router-dom";
import api from "../api/axios";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const verifyUser = async() => { 
            try {
                await api.get('/auth/me');
                setAuthenticated(true);
            } catch (e) {
                console.error(e);
                localStorage.removeItem('token');
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    if (loading) return <h1>Loading...</h1>

  return authenticated ? children : <Navigate to="/" replace />;

}
