import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = (props) => {
    let [movieTitle, setMovieTitle] = useState( props.querySearch ? props.querySearch : '' );

    const handleSubmit = (e) =>{
        e.preventDefault();
        props.setQuery(true);
        if (movieTitle === '') {
            props.setSearch({});
        } else {
            props.setSearch({query: movieTitle});
        }
        console.log(e.target)
        e.target.value = '';
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Recherche" onChange={(e) => setMovieTitle(e.target.value)} value={movieTitle}></input>
            <input className="submit" type="submit"></input>
        </form>
    )
}

export default SearchBar;