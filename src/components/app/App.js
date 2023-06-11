import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";
import decoration from '../../resources/img/vision.png';


const App = () => {
    const [state, setState] = useState({})
    const onCharSelected = (id)=>{
        setState({selectedChar: id})
    }
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList onCharSelected={onCharSelected}/>
                    <CharInfo charID={state.selectedChar}/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;