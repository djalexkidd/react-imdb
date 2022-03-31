import { useEffect, useState, Fragment, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Movies from "../components/Movies";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import SearchContext from "../SearchContext";

const apiCall =  'https://api.themoviedb.org/3/';
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGRmMjg2NDA3ZTYwYTk5NGZlZDIzN2JhOGQ3MjlkMyIsInN1YiI6IjYyNDMxYjRiYzc0MGQ5MDA1ZDdiYTM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iUKVxAX4-xPDc9sw3KoUwZKBEfDC9hiCE9quYmMeoz0';
let page = '?page=';

const Accueil = () => {
    
    const searchContext = useContext(SearchContext);
    const apiSearch = `?query=${searchContext.search}`;
    let {pageNumber} = useParams();
    let [search, setSearch] = useSearchParams()
    let name = search.get('name');
    pageNumber = (typeof pageNumber == 'undefined') ? 1 : pageNumber;
    let [moviesData, setMoviesData] = useState([]);
    let [pageMax, setPageMax] = useState(1);
    let [query, setQuery] = useState(false);

    useEffect(
        () => {
            let discover = 'discover/movie'+(isNaN(pageNumber) ? '' : page)+pageNumber;
            let searchMovie = 'search/movie'+apiSearch;
            fetch(apiCall+(!query ? discover : searchMovie), {
                headers: {
                    'Authorization': 'Bearer '+apiKey
                }
            })
            .then(response => response.json())
            .then(datas => {
                setMoviesData(datas.results)
                setPageMax(500);
            })
        }, [pageNumber]
    )
    pageNumber = +(pageNumber);
    return (
        <Fragment>
            <h1>Recherche ton film !</h1>
            <SearchBar query={query} name={name} setSearch={setSearch}/>
                <div className="movieResult">
                    {
                        moviesData.map(item => <Movies datas={item} key={item.id} />)
                    }
                </div>
            <Pagination pageMax={pageMax} pageNumber={pageNumber} withSearch={query}/>
            <Footer/>
        </Fragment>
    )
}

export default Accueil;