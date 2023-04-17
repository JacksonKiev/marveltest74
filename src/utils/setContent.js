import Spinner from '../components/spinner/Spinner';
import ErrorMessageMarvel from '../components/errorMessageMarvel/ErrorMessageMarvel';
import Skeleton from '../components/skeleton/Skeleton';
import CharForm from "../components/charForm/CharForm";


const setContent=(process,Component,data)=>{
    switch (process) {
        case 'waiting':
            return <Skeleton/>
              ;
            break;
        case 'loading':
            return  <Spinner/>;
            break;
        case 'confirmed':
            return <Component data={data}/>;       
           break;
        case  'error' :
            return <ErrorMessageMarvel/>;
            break;
        default :
        throw new Error('unexpected process state')

    }
}

export default setContent;