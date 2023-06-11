import './charInfo.scss';
import MarvelServices from '../../services/MarvelServices';
import { useEffect, useState } from 'react';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharInfo = ({charID}) => {
    console.log('CharInfo');
    const [char, setState] = useState(null)
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(false)

    const marvelServices = new MarvelServices()
    const onLoaded = (res)=>{
        setState(res)
        setLoad(false)
        setError(false)
    }
    const onError = ()=>{
        setError(true)
        setLoad(false)
    }
    const updateChar = ()=>{
        if(!charID){
            return
        }
        setLoad(true)
        marvelServices
        .getCharacter(charID)
        .then(onLoaded)
        .catch(onError)
    }
    useEffect(updateChar,// eslint-disable-next-line
    [charID])
    const skeletonStart = char||load||error?null: <Skeleton />
    const errorMessage = error?<ErrorMessage />: null
    const skeleton = load?<Skeleton />: null
    const content = !(load||error)&&char?<View char={char}/>: null
    return (
        <div className="char__info">
        {skeletonStart}
        {errorMessage}
        {skeleton}
        {content}
        </div>
    )
}

const View =({char})=>{
    const {name, description, thumbnail, homepage, wiki, comics} = char
    const notImage = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    const notImageStyle = notImage===thumbnail?{objectFit: 'contain'}:null
    const comicsMap=()=>{
        if (comics.length>10) {
            return comics.slice(0,10).map((item, index)=>
                            <li key={index}  className="char__comics-item">
                            {item.name}
                            </li>)}
        if (comics.length===0) {
            return <div>Not comics</div>
        }
        return comics.map((item, index)=>
                        <li key={index}  className="char__comics-item">
                            {item.name}
                        </li>)}
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={notImageStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
            {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsMap()}
            </ul>
        </>
    )
}

export default CharInfo;