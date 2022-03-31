import './App.css';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import NavBar from './components/NavBar';
import Accueil from './pages/Accueil';
import Favori from './pages/Favori';
import Avoir from './pages/Avoir';
import SearchContext from "./SearchContext";

function App() {

  let [search, setSearch] = useSearchParams();

  return (
    <div className="App">
      <SearchContext.Provider value={( search, setSearch )}>
        <NavBar/>
        <Routes>
          <Route path="/" element={ <Accueil/> }/>
          <Route path="favoris" element={ <Favori/> }/>
          <Route path="a-voir" element={ <Avoir/> }/>
          <Route path='/page/:pageNumber' element={ <Accueil/> }/>
          <Route path="*" element={<NotFound /> }/>
        </Routes>
      </SearchContext.Provider>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>
        Erreur 404
      </h1>
    </div>
  );
}

export default App;