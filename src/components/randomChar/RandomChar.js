import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useEffect, useState } from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../../spinner/004 Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = () => {
    const [state, setState] = useState({})
    const [load, setLoad] = useState(true)
    const [error, setError] = useState(false)
    useEffect(()=>{
        updateChar()
    },[])
    const marvelServices = new MarvelServices()
    const onLoaded = (res)=>{
        console.log(res);
        setState(res)
        setLoad(false)
        setError(false)
    }
    const onError = ()=>{
        setError(true)
        setLoad(false)
    }
    function updateChar(){
        setLoad(true)
        const id = Math.floor(Math.random()*(1011400-1011000)+1011000)
        marvelServices
            .getCharacter(id)
            .then(onLoaded)
            .catch(onError)
    }
    const errorMessage = error?<ErrorMessage />: null
    const spinner = load?<Spinner />: null
    const content = !(load||error)?<View state={state}/>: null

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={()=>updateChar()} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({state})=>{
    const {name, description, thumbnail, homepage, wiki} = state
    const notImage = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'===thumbnail?{objectFit: 'contain'}:null
    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" style={notImage} className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr randomchar__hidden">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;