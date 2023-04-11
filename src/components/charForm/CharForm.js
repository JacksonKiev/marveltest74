import useMarvelService from '../../services/MarvelService';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from "yup" 
import { useState } from 'react';
import { Link,NavLink} from 'react-router-dom';






// const onCharFound= (name)=>{
// const form = document.querySelector('.char__comics-form');
// // const div=document.createElement('div');
// // div.classList.add('char__comics-submit');
// // div.textContent=`There is! Visit ${name} page?`;
// // form.append(div);
// form.insertAdjacentHTML('beforeend',`<div class='char__comics-submit'>There is! Visit ${name} page?</div>`)

// }


 const CharForm=()=>{
    const [char,setChar]=useState(null);    
    const {loading,error,getCharacter,getCharacterByName,clearError} = useMarvelService();

    const onCharLoaded=(char)=>{
    setChar(char);
    console.log(char)
    }   
    const updateChar=(name)=>{
        clearError();
        getCharacterByName(name)
        .then(name=>{onCharLoaded(name)})
    }

    const result=!char?null:    
    <>  
    <div className='char__comics-submit'>There is! Visit {char.name} page?</div>
    <Link to={`/characters/${char.id}`} className="button button__secondary"> 
    <div className="inner">To page</div>
    </Link>
    </>           
   


const MyTextInput = (props)=>{
    const [field,meta]=useField(props);
        return (
            <>
                <input {...props} {...field}/> 
                <button type='submit' className="button button__main">
                        <div className="inner">Find</div>
                    </button>
                {meta.touched && meta.error ? (
                    <div className='char__comics-error'>{meta.error}</div>)
                    :null
                }
            </>
        )
}
    return(
        

        <Formik
        initialValues={{
            name:""
        }}
        validationSchema= {Yup.object({
            name: Yup.string()
            .min(2,'Minimum 2 symbols required')
            .required('This field is required'),
            
        })}
        onSubmit= {({name})=>{updateChar(name)}}
        > 
                    <Form action="#" className='char__comics-form'>
                    <h2> Or find a character by name: </h2>
                    <MyTextInput 
                    name ='name'
                     type="text" 
                     className='char__comics-input' 
                     placeholder='Enter name' 
                     />
                     {result }
                </Form> 
                
        </Formik>
    )
 }

 export default CharForm;