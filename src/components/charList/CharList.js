import React, { useEffect, useState } from 'react';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/004 Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

const setContent = (process) =>{
    switch (process) {
        case 'waiting':
            return <Spinner />
        case 'loading':
            return <Spinner />
        case 'confirmed':
            return
        case 'error':
            return <ErrorMessage />
        default:
            throw new Error('Unexpected process state')
    }
}

const CharList = ({onCharSelected}) => {
    const [charList, setCharList] = useState([])
    const [newItemLoad, setNewItemLoad] = useState(false)
    const [offset, setOffset] = useState(150)
    const [charEnded, setCharEnded] = useState(false)
    const [itemSelect, setItemSelect] = useState(null)
    const {getAllCharacters, process, setProcess} = useMarvelServices()

    useEffect(()=>{
        onRequest(offset, false)
        // eslint-disable-next-line
    },[])

    const selectOnItem = (id) => {
        setItemSelect(id);
    }
    
    const onRequest = (offset, initial=true)=>{
        setNewItemLoad(initial)
        getAllCharacters(offset)
            .then(onCharListloaded)
            .then(()=>setProcess('confirmed'))
    }

    const onCharListloaded =async(res)=>{
        if(res.length<9){
            setCharEnded(true)
        }
        setCharList([...charList,...res])
        setNewItemLoad(false)
        setOffset(prev=>prev+9)
    }
    const items = ()=>{
        return(
            <ul className="char__grid">
                {charList.map(item=>
                    <CardChar key={item.id} itemSelect={itemSelect} item={item} 
                    onCharSelected={onCharSelected} selectOnItem={selectOnItem}/>)}
            </ul>
        )
    }
    return (
        <div className="char__list" >
            {setContent(process)}
            {items()}
            {!charEnded&&
            <button onClick={()=>onRequest(offset)} 
            className="button button__main button__long"
            disabled={newItemLoad}>
                <div className="inner" >{newItemLoad?'loading...':'load more'}</div>
            </button>}
        </div>
    )
}

const CardChar =({item, onCharSelected, itemSelect,selectOnItem})=>{
    const notImage = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    const notImageStyle = notImage===item.thumbnail?{objectFit: 'fill'}:null
    return(
        <li className={`char__item ${itemSelect===item.id?'char__item_selected':null}`} 
        tabIndex={0}
        onClick={()=>{
            onCharSelected(item.id)
            selectOnItem(item.id)
            }}
        onKeyPress={(e) => {
            if (e.key === ' ' || e.key === "Enter") {
                onCharSelected(item.id);
                selectOnItem(item.id);
            }}}>
            <img src={item.thumbnail} alt="abyss" style={notImageStyle}/>
            <div className="char__name">{item.name}</div>
        </li>
    )
}

export default CharList;