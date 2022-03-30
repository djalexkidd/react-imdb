import './Movies.css';
import moins18 from '../images/moins18.png';
import firendly from '../images/coucouLesEnfants2.png';

const poster_url = 'https://image.tmdb.org/t/p/w500';

const Movies = (props) => {
    let datas = props.datas;
    return (
        <article className="movie">
            <img alt={datas.original_title} src={poster_url+datas.poster_path} />
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
                        <span className='favorite'></span>
                    </div>
                    <span className='voirFilm'>À voir</span>
                </div>
            </div>
        </article>
    )
}

export default Movies;