    import { useParams,Link } from 'react-router-dom';
    import '../charInfo/charInfo.scss';
    import {useEffect,useState } from 'react';
    import Spinner from '../spinner/Spinner';
    import ErrorMessageMarvel from '../errorMessageMarvel/ErrorMessageMarvel';
    import useMarvelService from '../../services/MarvelService';
    import { Helmet } from 'react-helmet';
    

        const SingleCharacterPage = () => {
        const {id}=useParams(); 
        const [char,setChar]=useState(null);
        const{loading,error,getCharacter,clearError} = useMarvelService();
       
        useEffect(
            ()=>{updateChar();
            },[id]
        )

    
    const updateChar=()=>{

        clearError();
        console.log(id);
        getCharacter(id)
        .then(char=>{console.log(char.id);onCharLoaded(char)})      
    }

    const onCharLoaded=(char)=> {
        setChar(char);

    } 

        const View=({char})=>{
            const { name,description,thumbnail,homepage,wiki,} = char;
            return (
                <>
                <Helmet>
                    <meta
                        name="description"
                        content={`${name}`}
                    />
                    <title>{`character ${name}`}</title>
                </Helmet>
                <div className="char__basics">
                <img src={thumbnail}  alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
                <Link  to="/" className="single-comic__back">Back to all</Link>
                </>

            )
        }
        const errorMessage = error?<ErrorMessageMarvel/>:null;
        const spinner=loading?<Spinner/>:null;
        const content=!(loading || error ||!char) ? <View char={char}/>:null;

        return (
                <>
                    {errorMessage}
                    {spinner}
                    {content}
                </>
        )


    }

    export default SingleCharacterPage;