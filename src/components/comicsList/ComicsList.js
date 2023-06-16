import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/004 Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';

const setContent = (process, Component, newItemLoad) =>{
    switch (process) {
        case 'waiting':
            return <Spinner />
        case 'loading':
            return newItemLoad?<Component/>:<Spinner />
        case 'confirmed':
            return <Component/>
        case 'error':
            return <ErrorMessage />
        default:
            throw new Error('Unexpected process state')
    }
}


const ComicsList = () => {
    const [comicsList, setComicsList] = useState([])
    const [newItemLoad, setNewItemLoad] = useState(false)
    const [offset, setOffset] = useState(150)
    const [comicsEnded, setComicsEnded] = useState(false)
    const {getAllComics, process, setProcess} = useMarvelServices()

    useEffect(()=>{
        onRequest(offset, false)
        // eslint-disable-next-line
    },[])
    
    const onRequest = (offset, initial=true)=>{
        setNewItemLoad(initial)
        getAllComics(offset)
            .then(onCharListloaded)
            .then(()=>setProcess('confirmed'))
    }

    const onCharListloaded = (res)=>{
        if(res.length<8){
            setComicsEnded(true)
        }
        setComicsList([...comicsList,...res])
        setNewItemLoad(false)
        setOffset(prev=>prev+8)
    }
   
    const items = comicsList.map(item=>
            <li key={item.id} className="comics__item" tabIndex={0}>
                <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}$</div>
                </Link>
            </li>)
    return (
        <div className="comics__list">
            {setContent(process, ()=>(<ul className="comics__grid">
                {items}
            </ul>),newItemLoad )}
            {comicsEnded?null:<button 
            onClick={()=>onRequest(offset)} 
            className="button button__main button__long"
            disabled={newItemLoad}>
                <div className="inner">{newItemLoad?'loading...':'load more'}</div>
            </button>}
        </div>
    )
}

export default ComicsList;