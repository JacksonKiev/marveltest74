import React,{ Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types'

import MarvelService from '../../services/MarvelService';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component  {
   state = {
    charList:[],
    loading:true,
    error:false,
    newItemLoading:false,
    charEnded:false,
    offset:210
   }  

   refsArr=[];

   setRefs=(ref)=>{
    this.refsArr.push(ref)}


//    myRef=React.createRef();


        componentClick=(i)=>{
            this.refsArr.forEach(item=>item.classList.remove("char__item_selected"));
            this.refsArr[i].classList.add("char__item_selected");
            this.refsArr[i].focus();
            console.dir(this.refsArr[i]);

            }
        

   marvelService=new MarvelService();
   
   componentDidMount(){
    const {offset}=this.state;
    this.onRequest(offset);
    window.addEventListener('scroll', this.onScrollLoad);
    
        //   this.myRef.current.classList.add("char__item");
        // console.log(this.myShmyRef);          
 
    }   

    componentWillUnmount(){
        window.removeEventListener('scroll', this.onScrollLoad)
    }

    onScrollLoad=()=>
    {if(document.documentElement.clientHeight+window.pageYOffset>=document.documentElement.scrollHeight){ 
        console.log(this.state.offset); 
         this.onRequest(this.state.offset);  
  
        }
    }

    onRequest=(offset)=>{
        this.onCharListLoading();
        this.marvelService
        .getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError);
    }

    onCharListLoading=()=>{
        this.setState({
            newItemLoading:true
         })
    }

    onCharListLoaded=(newCharList)=>{
        let ended=false;
        if(newCharList.length<9){
            ended=true;
        }
        this.setState(({charList,offset})=>({
            charList:[...charList,...newCharList],
            loading:false,
            newItemLoading:false,  
            offset:offset+9,        
            charEnded:ended
        }))
    }
    onError=()=>{
        this.setState({
            error:true,
            loading:false
        })}




 renderItems=(arr)=>{
    let items=arr.map((item,i)=>{
    let imgStyle={"objectFit":"cover"};
    if(item.thumbnail==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') imgStyle={"objectFit":"unset"};
            return (
                <li 
                tabIndex={i}
                ref={this.setRefs}
                className="char__item"
                key={item.id}
                onClick={()=>{this.props.onCharSelected(item.id);this.componentClick(i);}}
                onKeyPress={ (e)=>{ 
                    if (e.key===' ' || e.key==='Enter') {this.props.onCharSelected(item.id);
                    this.componentClick(i);}
                    }}>               

                <img 
                    src={item.thumbnail}  
                    alt={item.name}
                    style={imgStyle}
                    />

                <div className="char__name">{item.name}</div>
            </li>
            )
    });
    return (
        <ul className="char__grid">
        {items}  
        </ul>
    )
    }

    render() 
    { 
        const {charList,loading,error,offset,newItemLoading,charEnded}=this.state;
        const items=this.renderItems(charList);
        const errorMessage = error?<ErrorMessage/>:null;
        const spinner=loading?<Spinner/>:null;
        const content=!(loading || error) ? items:null;
        return (
            <div  ref={this.myRef}
            className="char__list">
         {errorMessage}
         {spinner}
         {content}      
         <button className={charEnded ?"button button__main button__long ":"button button__main button__long button__hover"}
                 onClick={()=>this.onRequest(offset)} 
                 disabled={newItemLoading}
                 style={{'cursor': charEnded ? 'unset' : 'pointer'}}
         >
                <div className="inner">{charEnded ? 'No more characters' : 'load more'}</div>
        </button>
        </div>
    )}
    
   
}

CharList.propTypes = {
    onCharSelected:PropTypes.func.isRequired
}
export default CharList;