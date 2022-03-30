import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Movies from "../components/Movies";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

const apiCall =  'https://api.themoviedb.org/3/';
let search = "";
const apiSearch = `?query=${search}`;
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGRmMjg2NDA3ZTYwYTk5NGZlZDIzN2JhOGQ3MjlkMyIsInN1YiI6IjYyNDMxYjRiYzc0MGQ5MDA1ZDdiYTM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iUKVxAX4-xPDc9sw3KoUwZKBEfDC9hiCE9quYmMeoz0';
let adult = '&include_adult=true';

const Accueil = () => {

    let [pageNumber, setPageNumber] = useState(1);
    let [moviesData, setMoviesData] = useState([]);
    let [pageMax, setPageMax] = useState(1);
    let [query, setQuery] = useState(false);

    useEffect(
        () => {
            let discover = 'discover/movie?page='+pageNumber+adult;
            let searchMovie = 'search/movie'+apiSearch;
            // if (search.length) setQuery(true);
            console.log(query)
            fetch(apiCall+(!query ? discover : searchMovie), {
                headers: {
                    'Authorization': 'Bearer '+apiKey
                }
            })
            .then(response => response.json())
            .then(datas => {
                setMoviesData(datas.results)
                setPageMax(datas.total_pages)
                setPageNumber(datas.page)
            })
        }, [pageNumber, search]
    )
    return (
        <Fragment>
            <h1>Recherche ton film !</h1>
            <SearchBar query={query}/>
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