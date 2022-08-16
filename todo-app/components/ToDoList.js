import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import {useEffect, useState} from 'react'
import Todo from "./ToDo";
import { Typography } from "@mui/material";

export default function ToDoList() {
    const [todos, setTodos] = useState([]);

    useEffect(()=>{                           //useEffect verileri getirir.//
        const ref=collection(db,'todos');
        const q=query(ref,orderBy("tarih","desc"))     //desc tarihin artan azanını sıralar.//
        const unsub=onSnapshot(q,(snap=>{
            setTodos(snap.docs.map(doc=>(
                {...doc.data(),id:doc.id,tarih:doc.data().tarih?.toDate().getTime()}
            )))
        }))
        return unsub;
    },[])
    return (
        <div>

            {todos.length===0 ?(
                <Typography variant="h5" sx={{mt:5, fontWeight:"bold"}}
                >Henüz Todo Eklenmedi...</Typography>
            ):(
                <Typography variant="h4" sx={{mt:5, fontWeight:"bold"}}>Todo Listesi</Typography>
            )}

            {todos.map(todo=>
            <Todo key={todo.id} todo={todo}/>)}
        </div>
    )
}
