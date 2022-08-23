import { createContext,useEffect,useState } from "react";
import { auth } from "../firebase/index";
import Loading from "../components/Loading";
import Login from "../components/Login";

export const AuthContext=createContext();


export default function AuthContextProvider({children}){

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        return auth.onIdTokenChanged(async (user)=>{
            if(!user){
                setCurrentUser(null);
                setLoading(false);
                console.log("Kullanıcı Bulunamadı");
                return;
            }
            const token=await user.getIdToken()
            setCurrentUser(user);
            setLoading(false);
            console.log("token :" + token);
            console.log("user : " + user);
        })
    },[])
        if(loading){
            return <Loading type="balls" color="green"/>
        }
        if(!currentUser){
            return <Login/>
        }else{
            return (<AuthContext.Provider value={currentUser}>
                {children}
            </AuthContext.Provider>)
        }

    
}
