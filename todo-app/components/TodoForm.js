import { Button,Typography,TextField } from "@mui/material"
import { useState,useContext } from "react"     //veriyi yakalamak için useState kullandık//
import { addDoc,collection,serverTimestamp, } from "firebase/firestore"
import { db } from "../firebase"
import { TodoContext } from "../contexts/TodoContext"
export default function TodoForm() {

    const {showAlert}=useContext(TodoContext)
    const [todos, setTodos] = useState({
        baslik:"",
        aciklama:""
    })

    const handleClick=async(e)=>{
        e.preventDefault();
        // console.log(todos);
        if(todos.baslik=="" || todos.aciklama==""){
            showAlert("error", "Başlık ya da açıklama boş geçilemez")
            return;
        }
        const ref=collection(db,"todos");
        const docRef= await addDoc(ref,{...todos,tarih:serverTimestamp()})
        console.log(docRef.id);
        setTodos({baslik:"",aciklama:""})
        // alert(`${docRef.id} id niz eklenmiştir`)
        showAlert("success",`${docRef.id} id li Todo Eklenmiştir`)
    }
    return (
        <div>
            <Typography  sx={{mt:3, fontWeight:"bold"}} variiant="h5" color="darkgrey" >Yeni Todo Ekle</Typography>
            <TextField  value={todos.baslik} fullWidth label="Başlık" margin="normal" onChange={e=>setTodos({...todos, baslik:e.target.value})}></TextField>
            <TextField value={todos.aciklama} fullWidth label="Açıklama" multiline maxRows={3} margin="normal" onChange={e=>setTodos({...todos,aciklama:e.target.value})}></TextField>
            <Button sx={{mt:3}} variant="outlined" color="success" onClick={handleClick}>Todo Ekle</Button>
        </div>
    )
}
