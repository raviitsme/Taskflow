import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../src/api/user";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async() => {
        try {
            const res = await getMe();
            setUser({ ...res.data.user });
        } catch (e) {
            console.log("Error fetching user : ", e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(localStorage.getItem("token")) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                fetchUser,
                loading
            }}>
                {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);