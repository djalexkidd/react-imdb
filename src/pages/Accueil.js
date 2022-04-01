import { useEffect, useState, Fragment, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import '../components/Accueil.css';
import Movies from "../components/Movies";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import SearchContext from "../SearchContext";

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
            if (!title === null || !title === undefined) {setQuery(true);} else {setQuery(false);}
            console.log(title)
            let apiSearch = '?query='+title;
            let discover = 'discover/movie'+(isNaN(pageNumber) ? '' : page)+pageNumber;
            let searchMovie = 'search/movie'+(title === null ? '' : apiSearch)+(pageQuery === 1 && query ? '&page='+pageQuery : '');
            console.log(query)
            fetch(apiCall+(!query ? discover : searchMovie), {
                headers: {
                    'Authorization': 'Bearer '+apiKey
                }
            })
            .then(response => response.json())
            .then(datas => {
                if ('results' in datas){
                    setMoviesData(datas.results)
                } else {
                    setMoviesData([])
                }
                console.log(query)
                setPageMax(500);
            })
        }, [pageNumber, search ,pageQuery]
    )
    pageNumber = +(pageNumber);
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