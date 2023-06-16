import { useHttp } from "../customhooks/http.hook"

const useMarvelServices = ()=> {
    const {request, clearError, process, setProcess}= useHttp()
    const _apiBase='https://gateway.marvel.com:443/v1/public/'
    const _apiKey='apikey=8ad567152c77f210f1e1a4ded747fb5e'
    const _baseOffset = 210

    const getAllCharacters = async (offset=_baseOffset)=>{
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }
    const getCharacterByName = async (name)=>{
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset=_baseOffset)=>{
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic)
    }

    const getComicOrChar = async (id, prop='characters')=>{
        const res = await request(`${_apiBase}${prop}/${id}?${_apiKey}`);
        if(prop==='comics') return _transformComic(res.data.results[0])
        if(prop==='characters') return _transformCharacter(res.data.results[0])
    }
    const _transformComic = (comic)=>{
        return {
            title: comic.title,
            id: comic.id,
            description: comic.description,
            pageCount: comic.pageCount,
            language: comic.textObjects[0].language,
            price: comic.prices[0].price?comic.prices[0].price:'not avialable',
            thumbnail: comic.thumbnail.path+'.'+comic.thumbnail.extension}      
    }

    const _transformCharacter = (char)=>{
        return {
            name: char.name,
            id: char.id,
            description: char.description,
            thumbnail: char.thumbnail.path+'.'+char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki:char.urls[1].url,
            comics: char.comics.items}
    }
    return { 
        getAllCharacters, clearError,
        getAllComics, getComicOrChar, 
        getCharacterByName, process, setProcess}
}

export default useMarvelServices