import { useEffect, useState, useContext } from "react";
import './Movies.css';
import moins18 from '../images/moins18.png';
import firendly from '../images/coucouLesEnfants2.png';
import FavoriteContext from '../FavoriteContext';

const poster_url = 'https://image.tmdb.org/t/p/w500';

const Movies = (props) => {
    let datas = props.datas;
    let favContext = useContext(FavoriteContext);
    let [isFav, setFav] = useState('');
    return (
        <article className="movie">
            {
                (datas.poster_path !== null) ? 
                    <img alt={datas.original_title} src={poster_url+datas.poster_path} />
                :
                    <span className="noImage">Image Non Disponible pour ce film</span>

            }
            <div>
                <div className='title'>
                    <h2>{datas.original_title}</h2>
                    {
                        (datas.adult) ?
                            <img src={moins18} className="age" alt="Interdit aux moins de 18 ans"/>
                        :
                            <img src={firendly} className="age" alt="Pour les enfants"/>
                    }
                </div>
                <p>{datas.overview}</p>
                <div className='content'>
                    <div className="clickableDiv">
                        <span onClick={() => { favContext.register(props.Datas) }} className={'favorite'+isFav}></span>
                    </div>
                    <span className='voirFilm'>À voir</span>
                </div>
            </div>
        </article>
    )
}

export default Movies;