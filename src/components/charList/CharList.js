import React,{ useState,useEffect,useRef,useMemo} from 'react';
import PropTypes from 'prop-types'
import useMarvelService from '../../services/MarvelService';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessageMarvel from '../errorMessageMarvel/ErrorMessageMarvel';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
// import setContent from '../../utils/setContent';

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
 
// //    useEffect(()=>
// //    {  window.addEventListener('scroll', onScrollLoad);
// //    return ()=>{   
// //        window.removeEventListener('scroll', onScrollLoad)
// //    }}
// //    )

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


//     const onCharListLoaded=async (newCharList)=>{
 
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
//     const duration =300;
//     let items=arr.map((item,i)=>{
//     let imgStyle={"objectFit":"cover"};
//     if(item.thumbnail==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') imgStyle={"objectFit":"unset"};
//             return (
//                 <CSSTransition 
//                 key={item.id}
//                 timeout={duration}
//                 classNames="modal"
//             >
//             <li 
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
//             </CSSTransition>
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
//         // const content=!(loading || error) ? items:null;

        
//         return (
//             <div  
//             className="char__list">
//          {errorMessage}
//          {spinner}
//          {items}      
//          <button className={charEnded ?"button button__main button__long ":"button button__main button__long button__hover"}
//                  onClick={()=>onRequest(offset)} 
//                  disabled={newItemLoading}
//                  style={{'cursor': charEnded ? 'unset' : 'pointer'}}
//          >
//                 <div className="inner">{charEnded ? 'No more characters' : 'load more'}</div>
//         </button>
//         </div>
//         )
    
    
   
// }


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    
    const {loading, error, getAllCharacters,process,setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(()=>setProcess('confirmed'));

    }

    const onCharListLoaded = async(newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        setCharList([...charList, ...newCharList]);
        setnewItemLoading(false);
        setOffset(offset + 9);
        setCharEnded(ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems (arr){
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <CSSTransition key={item.id} timeout={500} classNames="modal">
                    <li 
                        className="char__item"
                        tabIndex={0}
                        ref={el => itemRefs.current[i] = el}
                        onClick={() => {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.id);
                                focusOnItem(i);
                            }
                        }}>
                            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }
    
    // const items = renderItems(charList);

    // const errorMessage = error ? <ErrorMessageMarvel/> : null;
    // const spinner = loading && !newItemLoading ? <Spinner/> : null;

    const elements=useMemo(()=>{
        return setContent(process,()=>renderItems(charList),newItemLoading)
        // eslint-disable-next-line
    },[process])
    return (
        <div className="char__list">
            {elements}
            <button 
                disabled={newItemLoading} 
                style={{'display' : charEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;