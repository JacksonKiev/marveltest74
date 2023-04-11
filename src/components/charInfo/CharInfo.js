import {useEffect,useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from "yup" 
import PropTypes from 'prop-types'
import Spinner from '../spinner/Spinner';
import ErrorMessageMarvel from '../errorMessageMarvel/ErrorMessageMarvel';
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
//  import CharForm from '../charForm/СharForm';
import CharForm from '../charForm/CharForm';

const CharInfo =(props)=> {
        const [char,setChar]=useState(null);


   const{loading,error,getCharacter,getCharacterByName,clearError} = useMarvelService();

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
}

const onCharLoaded=(char)=> {
     setChar(char);
 }   

    

        //  const {char,loading,error}=this.state;

         const skeleton=char || loading || error ? null: <Skeleton/>
         const errorMessage = error?<ErrorMessageMarvel/>:null;
         const spinner=loading?<Spinner/>:null;
         const content=!(loading || error ||!char) ? <View char={char}/>:null;


        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
                <CharForm/>

             </div>
        )
    
}


const View=({char})=>{
    
    const { name,description,thumbnail,homepage,wiki,comics} = char;
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