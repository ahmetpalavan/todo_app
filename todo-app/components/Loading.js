import { Grid } from "@mui/material"
import ReactLoading from "react-loading"



export default function Loading({type,color}) {
    return (
        <Grid container spacing={0} direction="column" alignItems="center" textAlign="center" justifyContent="center" style={{minHeight:"100vh"}}>
            <ReactLoading color={color} type={type} height={"7%"} width={"7%"}/>
        </Grid>
        
    )
}
