import './charInfo.scss';
import { useEffect, useState } from 'react';
import useMarvelServices from '../../services/MarvelServices';
import setContent from '../../utils/setContent';

const CharInfo = ({charID}) => {
    const [char, setChar] = useState(null)
    const {getComicOrChar, process, setProcess} = useMarvelServices()
    useEffect(()=>{
        updateChar()
        // eslint-disable-next-line
    },[charID])
    
    const onLoaded = (char)=>{
        setChar(char)
    }
    const updateChar = ()=>{
        if(!charID){
            return
        }
        getComicOrChar(charID)
        .then(onLoaded)
        .then(()=>setProcess('confirmed'))
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View =({data})=>{
    const {name, description, thumbnail, homepage, wiki, comics} = data
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