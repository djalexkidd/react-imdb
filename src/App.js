import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Accueil from './pages/Accueil';
import Favori from './pages/Favori';
import Avoir from './pages/Avoir';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={ <Accueil/> }/>
        <Route path="favoris" element={ <Favori/> }/>
        <Route path="a-voir" element={ <Avoir/> }/>
        <Route path='/page/:pageNumber' element={ <Accueil/> }/>
        <Route path="*" element={<NotFound /> }/>
      </Routes>
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