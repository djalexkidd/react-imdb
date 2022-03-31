import './App.css';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import NavBar from './components/NavBar';
import Accueil from './pages/Accueil';
import Favori from './pages/Favori';
import Avoir from './pages/Avoir';
import FavoriteContext from './FavoriteContext';
import ScrollToTop from './components/ScrollToTop';

function App() {
  let [favs, setFavs] = useState([]);

  useEffect(
    () => {
      if (localStorage) {
        let movies = localStorage.getItem('myfav');
        if (movies && movies.length) {
            movies = JSON.parse(movies);
        } else {
            movies = [];
        }
        setFavs(movies);
      }
    }, []
  )

  const register = (a) => {
    if (localStorage) {
      let add = true;
      let movies = localStorage.getItem('myfav');
      if (movies && movies.length) {
        movies = JSON.parse(movies);
      } else {
        movies = [];
      }
      movies = movies.filter(
        (item) => {
          if (item.id === a.id) {
            add = false;
            return false;
          } else {
            return true;
          }
        }
      )
      if (add) {
        movies.push(movies);
      }
      setFavs(movies);
      let moviesStorage = JSON.stringify(movies);
      localStorage.setItem('myfav', moviesStorage);
    }
  }

  return (
    <div className="App">
      <FavoriteContext.Provider value={ {favs, register} }>
          <NavBar/>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={ <Accueil/> }/>
              <Route path="favoris" element={ <Favori/> }/>
              <Route path="a-voir" element={ <Avoir/> }/>
              <Route path='/page/:pageNumber' element={ <Accueil/> }/>
              <Route path="*" element={<NotFound /> }/>
            </Routes>
          </ScrollToTop>
        </FavoriteContext.Provider>
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