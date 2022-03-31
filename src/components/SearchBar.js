import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = (props) => {
    let [search, setSearch] = useSearchParams();
    let {query} = props.query;
    let title = search.get('original_title');
    let page = search.get('page');
    page = (!page) ? 1 : +(page);
    let [movieTitle, setMovieTitle] = useState( title ? title : '' );

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (!query) query = true;
        if (search === '') {
            setSearch({})
        } else {
            setSearch({name: movieTitle})
        }
    }

    // useEffect(
    //     () => {
    //         let url = 'https://api.themoviedb.org/3/'
    //         let name = search.get('name')
    //         if (name) {
    //             url += '?name='+name
    //         }
    //         fetch(url)
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
            <input placeholder="Recherche"></input>
            <input className="submit" type="submit"></input>
        </form>
    )
}

export default SearchBar;