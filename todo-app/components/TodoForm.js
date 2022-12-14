import { Button,Typography,TextField } from "@mui/material"
import { useRef,useEffect,useContext } from "react"     //veriyi yakalamak için useState kullandık//
import { addDoc,collection,serverTimestamp,updateDoc,doc } from "firebase/firestore"
import { db } from "../firebase"
import { TodoContext } from "../contexts/TodoContext"
import swal from 'sweetalert';
import { AuthContext } from "../contexts/AuthContext"
export default function TodoForm() {

    const {showAlert,todos,setTodos}=useContext(TodoContext)
    const {currentUser}=useContext(AuthContext)
    const inputRef=useRef();
    useEffect(()=>{
        const tiklanmaKontrol=(e)=>{
            if(!inputRef.current.contains(e.target)){
                console.log("inputlara tıklandı");
                setTodos({baslik:'',aciklama:''})
            }
            else{
                console.log('inputlar harici tıklandı');
            }
        }
        document.addEventListener("mousedown",tiklanmaKontrol);
        return()=>{
            document.removeEventListener("mousedown",tiklanmaKontrol)
        }
    },[])

    const handleClick=async(e)=>{
        e.preventDefault();
        // console.log(todos);
        if(todos.baslik=="" || todos.aciklama==""){
            swal("Are you sure you want to do this?", {
                buttons: ["Oh no!", "Yes!"],
            });
            // showAlert("error","Başlık ya da açıklama boş geçilemez")
            return;
        }
        if(todos?.hasOwnProperty("id")){
            const ref=doc(db,"todos",todos.id); //güncelleme
            const newTodo={baslik:todos.baslik,aciklama:todos.aciklama,sonGuncellemeTarihi:serverTimestamp()};
            updateDoc(ref,newTodo);
            swal({title:"Updated",text:"To do güncellenmiştir",icon:"success"})
        }else{ //ekleme
            const ref=collection(db,"todos");
            const docRef= await addDoc(ref,{...todos,tarih:serverTimestamp()})
            console.log(docRef.id);
            setTodos({baslik:"",aciklama:""})
            // alert(`${docRef.id} id niz eklenmiştir`)
            // showAlert("success")
            swal({
                title: "Good Job!!",
                text: "To do eklenmiştir!",
                icon: "success",
            });
        }
    

        
    }
    return (
        <div ref={inputRef}>
            <Typography  sx={{mt:3, fontWeight:"bold"}} variiant="h5" color="darkgrey" >Yeni Todo Ekle</Typography>
            <TextField  value={todos.baslik} fullWidth label="Başlık" margin="normal" onChange={e=>setTodos({...todos, baslik:e.target.value})}></TextField>
            <TextField value={todos.aciklama} fullWidth label="Açıklama" multiline maxRows={3} margin="normal" onChange={e=>setTodos({...todos,aciklama:e.target.value})}></TextField>
            {todos.hasOwnProperty("id")?(
                <Button sx={{mt:3}} variant="outlined" color="warning" onClick={handleClick}>TODO GÜNCELLE </Button>
            ) :(<Button sx={{mt:3}} variant="outlined" color="success" onClick={handleClick}>TODO EKLE</Button>)}
        </div>
    )
}
