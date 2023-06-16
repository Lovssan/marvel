import './singleComic.scss';
import { Link, useParams } from 'react-router-dom';
import useMarvelServices from '../../services/MarvelServices';
import { useEffect, useState } from 'react';
import setContent from '../../utils/setContent';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const SingleComicOrChar = ({prop}) => {
    const {id} = useParams()
    const [comic, setComic] = useState({})
    const {getComicOrChar, clearError, process, setProcess} = useMarvelServices()
    useEffect(()=>{
        updateComic()
        // eslint-disable-next-line
    },[id])
    
    const onLoaded = (res)=>{
        setComic(res)
    }
    const updateComic = ()=>{
        clearError()
        getComicOrChar(id, prop)
            .then(onLoaded)
            .then(()=>setProcess('confirmed'))
    }
    return (
        <div className="single-comic">
            {setContent(process, View, comic)}
            <Link to={prop==='comics'?'/comics':'/'} className="single-comic__back">Back to all</Link>
        </div>
    )
}
const View = ({data})=>{
    const {title=null, name=null, description, thumbnail, language=null, 
        pageCount=null, price=null} = data
    return <HelmetProvider>
            <Helmet>
                <meta
                    name="description"
                    content="Page of select char or comic"/>
                <title>{title||name}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title||name}</h2>
                <p className="single-comic__descr">{description}</p>
                {pageCount&&<p className="single-comic__descr">{pageCount} pages</p>}
                {language&&<p className="single-comic__descr">Language: {language}</p>}
                {price&&<div className="single-comic__price">{price}$</div>}
            </div>
           </HelmetProvider>
}

export default SingleComicOrChar;