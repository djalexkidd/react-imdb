import { useEffect, useState, Fragment } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import '../components/Accueil.css';
import Movies from "../components/Movies";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

const apiCall =  'https://api.themoviedb.org/3/';
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGRmMjg2NDA3ZTYwYTk5NGZlZDIzN2JhOGQ3MjlkMyIsInN1YiI6IjYyNDMxYjRiYzc0MGQ5MDA1ZDdiYTM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iUKVxAX4-xPDc9sw3KoUwZKBEfDC9hiCE9quYmMeoz0';
let page = '?page=';

const Accueil = () => {
    let {pageNumber} = useParams();
    let [search, setSearch] = useSearchParams();
    let querySearch = search.get('query');
    pageNumber = (typeof pageNumber == 'undefined') ? 1 : pageNumber;
    let [moviesData, setMoviesData] = useState([]);
    let [pageMax, setPageMax] = useState(1);
    let [query, setQuery] = useState(false);
    let [pageQuery, setPageQuery] = useState(1);
    
    useEffect(
        () => {
            setPageQuery(search.get('page'));
            let title = search.get('query');
            if (!title === null || !title === undefined || title) {setQuery(true);} else {setQuery(false);}
            let apiSearch = '?query='+title;
            let discover = 'discover/movie'+(isNaN(pageNumber) ? '' : page)+pageNumber;
            if (query && pageQuery === null) setPageQuery(1);
            let searchMovie = 'search/movie'+(title === null ? '' : apiSearch)+(!query ? '?' : '&')+'page='+(pageQuery === 0 ? 1 : pageQuery);
            fetch(apiCall+(!query ? discover : searchMovie), {
                headers: {
                    'Authorization': 'Bearer '+apiKey
                }
            })
            .then(response => response.json())
            .then(datas => {
                if ('results' in datas){
                    datas.total_pages = datas.total_pages > 500 ? 500 : datas.total_pages;
                    setMoviesData(datas.results)
                } else {
                    setMoviesData([])
                }
                setPageMax(datas.total_pages);
            })
        }, [pageNumber, search ,pageQuery, query]
    )
    pageNumber = +(pageNumber);
    pageQuery = +(pageQuery);
    return (
        <Fragment>
            <h1>Recherche ton film !</h1>
            <SearchBar query={query} querySearch={querySearch} setSearch={setSearch} setQuery={setQuery}/>
                <div className="movieResult">
                    {
                        (moviesData.length) ? 
                            moviesData.map(item => <Movies datas={item} key={item.id} />)
                        :
                            <p>Aucun résultat n'a été trouvé pour votre recherche</p>
                    }
                </div>
            <Pagination pageMax={pageMax} pageNumber={(query ? pageQuery : pageNumber)} withSearch={query}/>
            <Footer/>
        </Fragment>
    )
}

export default Accueil;