import { Link } from "react-router-dom"
import ErrorMessageMarvel from "../errorMessageMarvel/ErrorMessageMarvel"


const Page404=()=>
{ return (
    <div>
    <ErrorMessageMarvel/> 
    <p style={{"textAlign":"center","fontWeight":"bold,","fontSize":"24px"}}>Page Doesnt exist</p>
    <Link style={{'display':'block','textAlign':'center','fontWeight':'bold','fontSize':'24px','marginTop':'30px'}} to='/'>Back to main page</Link>
    </div>
)

}

export default Page404; 