import { BrowserRouter as Router, Route, Link, Routes } from 'react-router';
import { useContext } from 'react';
import { PerrosProvider, PerrosContext } from './PerrosContext';

import Home from './Home/index';
import Favoritos from './Favoritos/index';
import Original from './Original/index';
import Informativa from './informativa/index';

import './App.css';


function Navbar() {
  const { favorites } = useContext(PerrosContext);
  
  return (
    <nav className='c-menu'>
        <Link to="/">Home</Link>
        {/* Aquí mostramos la longitud del array de favoritos */}
        <Link to="/Favoritos">Favoritos ({favorites.length})</Link>
        <Link to="/Original">Original</Link>
        <Link to="/informativa">Informativa</Link>
       
    </nav>
  );
}

function App() {
  return (
    <PerrosProvider>
      <Router>
        <Navbar /> 
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/Favoritos' element={<Favoritos />}/>
            <Route path='/Original' element={<Original/>}/>
            <Route path='/informativa' element={<Informativa/>}/>
        </Routes>
      </Router>
    </PerrosProvider>
  );
}

export default App;