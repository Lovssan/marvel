import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";
import decoration from '../../resources/img/vision.png';
import CharSearchForm from "../charSearchForm/CharSearchForm";
import { Helmet, HelmetProvider } from "react-helmet-async";


const CharPage = () => {
    const [selectedChar, setSelectedChar] = useState()
    const onCharSelected = (id)=>{
        setSelectedChar(id)
    }
    return (<HelmetProvider>
                <Helmet>
                    <meta
                    name="description"
                    content="Marvel information portal"/>
                    <title>Marvel information portal</title>
                </Helmet>
                <RandomChar/>
                <div className="char__content">
                    <CharList onCharSelected={onCharSelected}/>
                    <div>
                    <CharInfo charID={selectedChar}/>
                    <CharSearchForm />
                    </div>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </HelmetProvider>
    )
}

export default CharPage;