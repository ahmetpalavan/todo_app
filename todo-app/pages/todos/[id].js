import { Grid,Button,Card,CardContent,CardActions,Typography } from "@mui/material"
import { collection,getDoc,getDocs,doc} from "firebase/firestore"
import { db } from "../../firebase";
import Link from 'next/link';



export default function TodoDetail({todoAhmet}) {
    const todo=JSON.parse(todoAhmet);
    return (
        <Grid container spacing={0} direction="column" alignItems="center" textAlign="center" justifyContent="center" style={{minHeight:"100vh"}}>
            <Grid item xs={4}>
                <Card sx={{minWidth:300,maxWidth:600,boxShadow:3}} style={{backgroundColor:'#fafafa'}}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {todo.baslik}
                        </Typography>
                        <Typography variant="h5" component="div" sx={{mt:2}} color="GrayText">
                            {todo.aciklama}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link href="/">
                            <Button size="small">Geri Dön</Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export const getStaticPaths= async()=>{
    const snap = await getDocs(collection(db,'todos'));
    const paths=snap.docs.map(doc=>{
        return{
            params:{id:doc.id.toString()}
        }
    })
    return {
        paths,
        fallback:false
    }
}

export const getStaticProps=async(context)=>{
    const id=context.params.id;
    const docRef=doc(db,'todos',id);
    const docSnap=await getDoc(docRef);

    return{
        props:{todoAhmet:JSON.stringify(docSnap.data())|| null}
    }
}