import './SearchBar.css';

const SearchBar = () => {
    return (
        <form>
            <input placeholder="Recherche"></input>
            <input className="submit" type="submit"></input>
        </form>
    )
}

export default SearchBar;