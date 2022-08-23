import Head from 'next/head'
import {Container, Snackbar, Alert,Box,Button,Typography,Avatar, Stack} from '@mui/material'
import ToDoList from '../components/ToDoList'
import TodoForm from '../components/TodoForm'
import {TodoContext} from '../contexts/TodoContext'
import { useState,useContext } from 'react'
import { auth } from '../firebase';
import {AuthContext} from "../contexts/AuthContext"
import { green } from '@mui/material/colors'

export default function Home() {
  const {currentUser}=useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessagge] = useState("")
  const showAlert=(msg,type)=>{
    setAlertMessagge(msg);
    setAlertType(type);
    setOpen(true);
  }
  const [todos, setTodos] = useState({
    baslik:"",
    aciklama:""
  })
  const handleClose=(e,reason)=>{
    if(reason==='clickaway'){
      return
    }
    setOpen(false)
  };
  return (
    <TodoContext.Provider value={{showAlert,todos,setTodos}}>
  <Container maxWidth="md">
    <Head>
      <title>Ahmet Todo App</title>
      <meta name='description' content='nextjs ile todo app' />
      <link rel='icon' href='/favicon.ico'/>
    </Head>
    <Box sx={{display:"flex",justifyContent:"space-between",mt:3}}>
      <Stack spacing={3}>
        <Avatar sx={{bgcolor:green[800]}}>A</Avatar>
      </Stack>
      <Typography variant='h5'>
        {currentUser}
      </Typography>
      <Button onClick={()=>auth.signOut()} variant="contained" color='primary'>
        Çıkış Yap
      </Button>
    </Box>
	<TodoForm />
	  <Snackbar anchorOrigin={{ vertical:"top", horizontal:'center' }} open={open} autoHideDuration={4000} onClose={handleClose}>
	      <Alert onClose={handleClose} success={alertType} sx={{ width: '100%' }}>
	        {alertMessage}
	      </Alert>
	  </Snackbar>
	<ToDoList />
  </Container>
</TodoContext.Provider>
    
  )
}
