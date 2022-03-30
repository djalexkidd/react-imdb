import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Movies from "../components/Movies";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const apicall =  'https://api.themoviedb.org/3/';
let search = ""
const apisearch = `https://api.themoviedb.org/3/search/movie?query=${search}`
const apikey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGRmMjg2NDA3ZTYwYTk5NGZlZDIzN2JhOGQ3MjlkMyIsInN1YiI6IjYyNDMxYjRiYzc0MGQ5MDA1ZDdiYTM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iUKVxAX4-xPDc9sw3KoUwZKBEfDC9hiCE9quYmMeoz0';
const poster_url = 'https://image.tmdb.org/t/p/w500'

const Accueil = () => {

    let [pageNumber, setPageNumber] = useState(1);
    let [moviesData, setMoviesData] = useState([]);
    let [pageMax, setPageMax] = useState(1);

    useEffect(
        () => {
            let discover = 'discover/movie';
            let searchMovie = 'search/movie';
            let query = false;

            fetch(apicall+(!query ? discover : searchMovie), {
                headers: {
                    'Authorization': 'Bearer '+apikey
                }
            })
            .then(response => response.json())
            .then(datas => {
                setMoviesData(datas.results)
                setPageMax(datas.total_pages)
                setPageNumber(datas.page)
                console.log(pageNumber)
            })
        }, [pageNumber]
    )
    return (
        <Fragment>
            <h1>Recherche ton film !</h1>
            <SearchBar/>
            <div className="movieResult">
                {
                    moviesData.map(item => <Movies datas={item} key={item.id} />)
                }
            </div>
            <Pagination pageMax={pageMax} pageNumber={pageNumber}/>
        </Fragment>
    )
}

export default Accueil;