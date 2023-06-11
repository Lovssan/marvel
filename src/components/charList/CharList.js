import React, { useEffect, useState } from 'react';
import MarvelServices from '../../services/MarvelServices';
import './charList.scss';

const CharList = ({onCharSelected}) => {
    const [state, setState] = useState([])
    const [offset, setOffset] = useState(150)
    const [loading, setLoading] = useState([false, 'load more'])
    const [charEnded, setCharEnded] = useState(false)
    const [itemSelect, setItemSelect] = useState(null)

    const selectOnItem = (id) => {
        setItemSelect(id);
    }

    const marvelServices = new MarvelServices()
    const onRequest = (offset)=>{
        setLoading([true, 'loading...'])
        setOffset(prev=>{
            console.log(prev)
            return prev+9})
        marvelServices.getAllCharacters(offset).then(res=>setState(prev=>{
            setLoading([false, 'load more'])
            if(res.length<9){
                setCharEnded(true)
            }
            return [...prev,...res]}))
    }
    useEffect(()=>{
        console.log('useEffect');
        onRequest()
    },// eslint-disable-next-line
    [])
    return (
        <div className="char__list" >
            <ul className="char__grid">
                {state.map(item=>
                    <CardChar key={item.id} itemSelect={itemSelect} item={item} 
                    onCharSelected={onCharSelected} selectOnItem={selectOnItem}/>)}
            </ul>
            {!charEnded&&<button onClick={()=>onRequest(offset)} 
            className="button button__main button__long"
            disabled={loading[0]}>
                <div className="inner" >{loading[1]}</div>
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
            selectOnItem(item.id)}}>
            <img src={item.thumbnail} alt="abyss" style={notImageStyle}/>
            <div className="char__name">{item.name}</div>
        </li>
    )
}

export default CharList;