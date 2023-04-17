import React,{ useState,useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import './comicsList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessageMarvel from '../errorMessageMarvel/ErrorMessageMarvel';
import { Link } from 'react-router-dom';

// const CharList =(props) =>{
//     const [charList,setCharList]=useState([]);
//     const [newItemLoading,setNewItemLoading]=useState(false);
//     const [offset,setOffset]=useState(210);
//     const [charEnded,setCharEnded]=useState(false);

 

//    const refsArr=useRef([]);
// //    myRef=React.createRef();

//       const   componentClick=(i)=>{
//             refsArr.current.forEach(item=>item.classList.remove("char__item_selected"));
//             refsArr.current[i].classList.add("char__item_selected");
//             refsArr.current[i].focus();
//             }
        

//   const {loading,error,getAllCharacters}=useMarvelService();
   
//    useEffect(()=>
//    {
//     onRequest(offset,true); 

//    },[])
 
//    useEffect(()=>
//    {  window.addEventListener('scroll', onScrollLoad);
//    return ()=>{   
//        window.removeEventListener('scroll', onScrollLoad)
//    }}
//    )

// const onScrollLoad=()=>
// {if(document.documentElement.clientHeight+window.pageYOffset>=document.documentElement.scrollHeight){ 
// onRequest(offset); 

// }
// }

//     const onRequest=(offset,initial)=>{
//         initial ?  setNewItemLoading(false) : setNewItemLoading(true);  
//         getAllCharacters(offset)
//         .then(onCharListLoaded) 
//     }


//     const onCharListLoaded=(newCharList)=>{
//         let ended=false;
//         if(newCharList.length<9){
//             ended=true;
//         }
//         setCharList(charList=>[...charList,...newCharList]);
//         setNewItemLoading(newItemLoading=>false);
//         setOffset(offset=>offset+9);
//         setCharEnded(charEnded=>ended);
//     }
 

//  function renderItems(arr){
//     let items=arr.map((item,i)=>{
//     let imgStyle={"objectFit":"cover"};
//     if(item.thumbnail==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') imgStyle={"objectFit":"unset"};
//             return (
//                 <li 
//                 tabIndex={i}
//                 ref={item=>refsArr.current[i]=item}
//                 className="char__item"
//                 key={item.id}
//                 onClick={()=>{props.onCharSelected(item.id);componentClick(i);}}
//                 onKeyPress={ (e)=>{ 
//                     if (e.key===' ' || e.key==='Enter') {props.onCharSelected(item.id);
//                     componentClick(i);}
//                     }}>               

//                 <img 
//                     src={item.thumbnail}  
//                     alt={item.name}
//                     style={imgStyle}
//                     />

//                 <div className="char__name">{item.name}</div>
//             </li>
//             )
//     });
//     return (
//         <ul className="char__grid">
//         {items}  
//         </ul>
//     )
//     }    

//         const items=renderItems(charList);
//         const errorMessage = error?<ErrorMessage/>:null;
//         const spinner=loading && !newItemLoading ?<Spinner/>:null;
const setContent=(process,Component,newItemLoading)=>{
    switch (process) {
        case 'waiting':
            return  <Spinner/>;
            break;
        case 'loading':
            return  newItemLoading ?   <Component/> : <Spinner/> ;
            break;
        case 'confirmed' :

            return   <Component/> ;        
            break;
        case  'error' :
            return <ErrorMessageMarvel/>;
            break;
        default :
        throw new Error('unexpected process state')

    }
}
const ComicsList = (props) => {

    const [comicsList,setComicsList]=useState([]);
    const [offset,setOffset]=useState(0);
    const {loading,error,getAllComics,process,setProcess}=useMarvelService();
    const [comicEnded,setComicEnded]=useState(false);
    const [newItemLoading,setNewItemLoading]=useState(false);

    useEffect(()=>
    {
     onRequest(offset,true); 
 
    },[])
  
const onRequest=(offset,initial)=>{
         initial ?  setNewItemLoading(false) : setNewItemLoading(true);  
         getAllComics(offset)
        .then(onComicsListLoaded)
        .then(()=>setProcess('confirmed'));
    }


    const onComicsListLoaded=(newComicList)=>{
        let ended=false;
        if(newComicList.length<8){
            ended=true;
        }
        setComicsList([...comicsList,...newComicList]);
        setNewItemLoading(false);
        setOffset(offset=>offset+8);
        setComicEnded(ended);
    }

    function renderItems(arr){
        let items=arr.map((item,i)=>{
        let imgStyle={"objectFit":"cover"};
        if(item.thumbnail==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') imgStyle={"objectFit":"unset"};
                return (
                    <li 
                    key={i}
                    className="comics__item">
                    <Link to={`/comics/${item.id}`} href="#">
                        <img 
                        src={item.thumbnail}  
                        style={imgStyle} 
                        alt={item.name}
                        className="comics__item-img"/>
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
                )
        });
        return (
            <ul className="comics__grid">
            {items}  
            </ul>
        )
        }    
    
            const items=renderItems(comicsList);
            const errorMessage = error?<ErrorMessageMarvel/>:null;
            const spinner=loading && !newItemLoading ?<Spinner/>:null;  

    return (
        <div className="comics__list">

            {/* {errorMessage}
            {spinner}
             {items} */}
             {setContent(process,()=>renderItems(comicsList),newItemLoading)}
            <button 
                     onClick={()=>onRequest(offset,false)} 
                    disabled={newItemLoading}
                    style={{'display': comicEnded || newItemLoading ? 'none' : 'block'}}
                    className="button button__main button__long">
                 <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;

