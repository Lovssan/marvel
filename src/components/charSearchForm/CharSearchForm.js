import { useState } from 'react';
import { Link } from 'react-router-dom';
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {useForm} from "react-hook-form";
import './CharSearchForm.scss';

const setContent = (process , char) =>{
    switch (process) {
        case 'waiting':
            return
        case 'loading':
            return
        case 'confirmed':
            return !char ? null : char.length > 0 ?
            <div className="char__search-wrapper">
                <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                    <div className="inner">To page</div>
                </Link>
            </div> : 
            <div className="char__search-error">
                The character was not found. Check the name and try again
            </div>;
        case 'error':
            return <div className="char__search-critical-error"><ErrorMessage /></div>
        default:
            throw new Error('Unexpected process state')
    }
}

const CharSearchForm = () => {
    const [char, setChar] = useState(null);
    const {getCharacterByName, clearError, process, setProcess} = useMarvelServices();
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const onCharLoaded = (char) => {
        setChar(char);
        setButtonDisabled(false)
    }

    const updateChar = (name) => {
        setButtonDisabled(true)
        clearError();
        getCharacterByName(name)
            .then(onCharLoaded)
            .then(()=>setProcess('confirmed'))
    }
    return (
        <div className="char__search-form">
                <form onSubmit={handleSubmit(data=>updateChar(data.charName))}>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <input 
                            id="charName" 
                            type='text' 
                            placeholder="Enter name"
                            {...register('charName', {required: true})}/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={buttonDisabled}>
                            <div className="inner">{buttonDisabled?'finding...':'find'}</div>
                        </button>
                    </div>
                    {errors.charName&&<div className="char__search-error">To search for a character, enter the full name</div>}
                    {/* <FormikErrorMessage component="div" className="char__search-error" name="charName" /> */}
                </form>
            {setContent(process, char)}
        </div>
    )
}

export default CharSearchForm;