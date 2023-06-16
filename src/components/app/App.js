import AppHeader from "../appHeader/AppHeader";
import CharPage from "../charPage/charPage";
import {BrowserRouter, Routes, Route  } from "react-router-dom";
import ComicsPage from "../comicsPage/ComicsPage";
import Page404 from "../404page/404";
import SingleComicOrChar from "../singleComic/SingleComic";


const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                        <Routes>
                            <Route path="/" element = {<CharPage />} />
                            <Route path="/characters/:id" element = {<SingleComicOrChar prop='characters' />} />
                            <Route path="/comics" element = {<ComicsPage />} />
                            <Route path="/comics/:id" element = {<SingleComicOrChar prop='comics' />} />
                            <Route path="*" element = {<Page404 />}/>
                        </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;