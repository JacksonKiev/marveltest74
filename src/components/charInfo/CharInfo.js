import {useEffect,useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from "yup" 
import PropTypes from 'prop-types'
import Spinner from '../spinner/Spinner';
import ErrorMessageMarvel from '../errorMessageMarvel/ErrorMessageMarvel';
import Skeleton from '../skeleton/Skeleton';
import CharForm from "../charForm/CharForm";
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const CharInfo =(props)=> {
        const [char,setChar]=useState(null);


   const{loading,error,getCharacter,clearError,process,setProcess} = useMarvelService();

useEffect(
    ()=>{updateChar();
    },[props.charId]
)
    

const updateChar=()=>{
    const{charId}=props;
    if (!charId) {
          return;
    }
    clearError();
    getCharacter(charId)
    .then(onCharLoaded)
    .then(()=>setProcess('confirmed'))  
}

const onCharLoaded=(char)=> {
     setChar(char);
 }   

        // const setContent=(process,char)=>{
        //     switch (process) {
        //         case 'waiting':
        //             return <><Skeleton/> <CharForm/></> ;
        //             break;
        //         case 'loading':
        //             return  <Spinner/>;
        //             break;
        //         case 'confirmed' :
        //             return <View char={char}/>;
        //             break;
        //         case  'error' :
        //             return <ErrorMessageMarvel/>;
        //             break;
        //         default :
        //         throw new Error('unexpected process state')

        //     }
        // }

        //  const {char,loading,error}=this.state;

/*          const skeleton=char || loading || error ? null: <Skeleton/>
         const errorMessage = error?<ErrorMessageMarvel/>:null;
         const spinner=loading?<Spinner/>:null;
         const content=!(loading || error ||!char) ? <View char={char}/>:null; */


        return (
            <div className="char__info">
                {/* {skeleton}
                {errorMessage}
                {spinner}
                {content}
                <CharForm/> */} 
            {setContent(process,View,char)}
            <CharForm/>

             </div>
        )
    
}


const View=({data})=>{
    
    const { name,description,thumbnail,homepage,wiki,comics} = data;
    let imgStyle={"objectFit":"cover"};
    if(thumbnail==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') imgStyle={"objectFit":"contain"};
   
        let comicsShort=[];
        if(comics.length>=9){ for(let i=0;i<=9;i++){comicsShort[i]=comics[i]}}
        else{ for(let i=0;i<comics.length;i++){comicsShort[i]=comics[i]}}
    return(
    <>
                    <div className="char__basics">
                    <img src={thumbnail}  style= {imgStyle}alt="abyss"/>
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
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {  comics.length!==0?null:"There are no comics with this character"}
           
                    {comicsShort.map((item,i)=>{ 
                            if(i>=10) {
                              return};
                            return (
                                <li key={i} className="char__comics-item">
                                 {item.name}
                                 </li>        
                            )
                        })
                    }

                </ul>
                {/* <CharForm/> */}
                {/* <form action="#" className='char__comics-form'>
                    <h2> Or find a character by name: </h2>
                    <input type="text" className='char__comics-input' placeholder='Enter name' />
                    <a href='#' className="button button__main">
                        <div className="inner">Find</div>
                    </a>
                </form> */}
    </>
    )
     
}

CharInfo.propTypes = {
    charId:PropTypes.number
}
export default CharInfo;