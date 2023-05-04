import React, { useState, useEffect, useContext } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";


interface User {
    id: number;
    person: {
        firstName: string;
        lastName: string;
        email: string | null;
        phone: string | null;
    };
    isAdmin: boolean;
    role: string;
}

export const AuthContext = React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: (auth: any) => { },
    user: {
        id: 0,
        person: {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        },
        isAdmin: false,
        role: '',
    },
    fetchUser: () => { },
});

const AuthProvider = (obj: any) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setIsAuthenticated(true);
            console.log("Token retrieved successfully:", savedToken);
            // Fetch user information based on the logged-in user's ID
            fetchUser();
        }
    }, []);

    const fetchUser = () => {
        let userId = localStorage.getItem("userId");
        if (userId !== null && userId !== undefined) {
            fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/user/${userId}`)
                .then((response) => response.json())
                .then((data) => setUser(data));
        } else {
            navigate("/login");
        }
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, user, fetchUser }}
        >
            {obj.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
