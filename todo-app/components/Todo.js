import {ListItem, ListItemText} from '@mui/material'
import {IconButton} from '@mui/material';
import moment from 'moment'
import 'moment/locale/tr'
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { deleteDoc, doc} from 'firebase/firestore';
import { db } from '../firebase';
import { TodoContext } from '../contexts/TodoContext';
import { useContext } from 'react';
export default function ToDo({todo}) {
    const {id,baslik,aciklama,tarih}=todo;
    const {showAlert,setTodos}=useContext(TodoContext)
    const handleDelete= async(id,e)=>{
        e.preventDefault()
        const ref=doc(db,"todos",id)
        await deleteDoc(ref)
        showAlert("warning")
    }
    return (
        <ListItem onClick={()=>setTodos({aciklama,tarih,id,baslik})} sx={{mt:3, boxShadow:3}} style={{backgroundColor:"#FAFAFA"}} secondaryAction={
            <>
                <IconButton onClick={(e)=>handleDelete(id,e)}>
                    <DeleteIcon  />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </>
        }>
            <ListItemText primary={baslik} secondary={moment(tarih).format('LLL')}/>
        </ListItem>
    )
}
