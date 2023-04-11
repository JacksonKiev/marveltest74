import { useParams,Link } from 'react-router-dom';
import './singleComicPage.scss';
import {useEffect,useState } from 'react';
import Spinner from '../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner';
import ErrorMessageMarvel from '../errorMessageMarvel/ErrorMessageMarvel';
import './singleComicPage.scss';
import useMarvelService from '../../services/MarvelService';
import { Helmet } from 'react-helmet';

    const SingleComicPage = () => {
    const {comicId}=useParams();
    const [comic,setComic]=useState(null);
    const{loading,error,getComic,clearError} = useMarvelService();

    useEffect(
        ()=>{updateComic(); 
        },[comicId]
    )

    const updateComic=()=>{
        clearError();
        getComic(comicId)
        .then(onComicLoaded) ;
    }
    
    const onComicLoaded=(comic)=> {
         setComic(comic);
     } 
     
    const View=({comic})=>{
        const {name,description,pageCount,thumbnail,language,price}= comic;
        console.log(comic)
        return (
            <div className="single-comic">
        <Helmet>
        <meta
            name="description"
            content={`Comics ${name}`}
        />
            <title>{`Comics ${name}`}</title>
        </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link  to="/comics" className="single-comic__back">Back to all</Link>
        </div>
        )
    }
     const errorMessage = error?<ErrorMessageMarvel/>:null;
     const spinner=loading?<Spinner/>:null;
     const content=!(loading || error ||!comic) ? <View comic={comic}/>:null;

    return (
            <>  <AppBanner/>    

                {errorMessage}
                {spinner}
                {content}
            </>
    )


}

export default SingleComicPage;

