import Head from 'next/head'
import {Container, Snackbar, Alert} from '@mui/material'
import ToDoList from '../components/ToDoList'
import TodoForm from '../components/TodoForm'
import {TodoContext} from '../contexts/TodoContext'
import { useState } from 'react'
export default function Home() {
  const [open, setOpen] = useState(false)
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessagge] = useState("")
  const showAlert=(msg,type)=>{
    setAlertMessagge(msg);
    setAlertType(type);
    setOpen(true);
  }
  const handleClose=(e,reason)=>{
    if(reason==='clickaway'){
      return
    }
    setOpen(false)
  }
  return (
    <TodoContext.Provider value={{showAlert}}>
  <Container maxWidth="md">
	<TodoForm />
	<Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={open} autoHideDuration={4000} onClose={handleClose}>
	    <Alert onClose={handleClose} success={alertType} sx={{ width: '100%' }}>
	      {alertMessage}
	    </Alert>
	</Snackbar>
	<ToDoList />
  </Container>
</TodoContext.Provider>
    
  )
}
