import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import './SearchBar.css';

const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGRmMjg2NDA3ZTYwYTk5NGZlZDIzN2JhOGQ3MjlkMyIsInN1YiI6IjYyNDMxYjRiYzc0MGQ5MDA1ZDdiYTM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iUKVxAX4-xPDc9sw3KoUwZKBEfDC9hiCE9quYmMeoz0';

const SearchBar = (props) => {
    let [movieTitle, setMovieTitle] = useState( props.name ? props.name : '' );

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (movieTitle === '') {
            props.setSearch({});
        } else {
            props.setSearch({name: movieTitle});
        }
    }

    // useEffect(
    //     () => {
    //         let url = 'https://api.themoviedb.org/3/search/movie'
    //         if (name) {
    //             url += '?query='+name
    //         }
    //         fetch(url, {
    //             headers: {
    //                 'Authorization': 'Bearer '+apiKey
    //             }
    //         })
    //             .then(response => response.json())
    //             .then(films => {
    //                 if ('results' in films) {
    //                     setMovieTitle(films.results)
    //                 }
    //             })
    //     }, [search]
    // )

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Recherche" onChange={(e) => setMovieTitle(e.target.value)} value={movieTitle}></input>
            <input className="submit" type="submit"></input>
        </form>
    )
}

export default SearchBar;