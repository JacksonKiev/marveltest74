
import { useHttp } from "../hooks/http.hooks";

const useMarvelService =()=>{
    
   const{loading,request,error,clearError,process,setProcess} =useHttp();

   const  _apiBase = `https://gateway.marvel.com:443/v1/public/`,
    _apiKey = `apikey=38c7f5be2aa6b821281191b8859a57ce`,
    _baseOffset=210;
    // https://gateway.marvel.com:443/v1/public/comics?apikey=38c7f5be2aa6b821281191b8859a57ce

    const getAllCharacters = async (offset=_baseOffset) => {
         const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }
        const getAllComics =async (offset=_baseOffset)=>{
            const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
            return res.data.results.map(_transformComic)

        }

    const getComic =async (id)=>{
            const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
            return _transformComic(res.data.results[0]);
        }

    const  getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        console.log(res.data.results[0]);

        return _transformCharacter(res.data.results[0]);

    }

    const  getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
         return _transformCharacter(res.data.results[0]);
    
    }

   const _transformCharacter = (char) => {
        return {        
            id:char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0,210)}...` : "No description available",
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics:char.comics.items
        }
    }

    const _transformComic = (comic) => {
        return {
            id:comic.id,
            name: comic.title,
            description: comic.description ? `${comic.description.slice(0,210)}...` : "No description available",
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            price:comic.prices[0].price?`${comic.prices[0].price}$`: "not available",
            pageCount:comic.pageCount,
            language:comic.textObjects[0]?.language  || "en-us"
            // language:comic.textObjects[0].language ? comic.textObjects[0].language : 1

          
        }
    }
    return {
        // loading,
        // error,
        getAllCharacters,
        getCharacter,
        getCharacterByName,
        getAllComics,
        clearError,
        process,
        setProcess,
        getComic}
}

export default useMarvelService;