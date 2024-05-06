import { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });
    useEffect(()=>{
        const data = localStorage.getItem("auth");
        if(data){
            const parseData = JSON.parse(data);
            // console.log(parseData);
            setAuth ({
                ...auth,
                user : parseData.user,
                token : parseData.token,
            });
        }
    },[]);

    return (
        <authContext.Provider value={[auth, setAuth]}>
            {children}
        </authContext.Provider>
    );
};

// Custom hook    
const useAuth = () => useContext(authContext);

export { useAuth, AuthProvider };
