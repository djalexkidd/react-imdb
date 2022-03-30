import './SearchBar.css';

const SearchBar = (props) => {
    let {query} = props.query;

    const handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(query)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Recherche"></input>
            <input className="submit" type="submit"></input>
        </form>
    )
}

export default SearchBar;