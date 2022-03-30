import { useEffect, useState, Fragment } from "react";
import Movies from "../components/Movies";

const apicall =  'https://api.themoviedb.org/3/';
const apikey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGRmMjg2NDA3ZTYwYTk5NGZlZDIzN2JhOGQ3MjlkMyIsInN1YiI6IjYyNDMxYjRiYzc0MGQ5MDA1ZDdiYTM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iUKVxAX4-xPDc9sw3KoUwZKBEfDC9hiCE9quYmMeoz0';
const poster_url = 'https://image.tmdb.org/t/p/w500'

const Accueil = () => {

    let [moviesData, setMoviesData] = useState([]);

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
            })
        }, []
    )
    return (
        <Fragment>
            <h1>Accueil !</h1>
            <div className="movieResult">
                {
                    moviesData.map(item => <Movies datas={item} key={item.id} />)
                }
            </div>
        </Fragment>
    )
}

export default Accueil;