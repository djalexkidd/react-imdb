import './Movies.css';

const poster_url = 'https://image.tmdb.org/t/p/w500'

const Movies = (props) => {
    let datas = props.datas;
    return (
        <article className="movie">
            <img src={poster_url+datas.poster_path} />
            <h2>{datas.original_title}</h2>
        </article>
    )
}

export default Movies;