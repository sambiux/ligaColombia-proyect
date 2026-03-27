
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router'


import Original from './Original'
import Equipo from './equipo'
import Home from './Home'
import Favoritos from './Favoritos'
import Informativa from './informativa'
import Usuario from './usuario'
import './App.css'

function App() {


  return (
    <>
      <Router>
        
        <nav className='c-menu'>
            <Link to="/">Home</Link>
            <Link to="/Favoritos">Favorito</Link>
            <Link to="/Original">Origin</Link>
            <Link to="/informativa">Informativa</Link>
            <Link to="/usuario">Usuario</Link>
        </nav>

          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/Favoritos' element={<Favoritos/>}/>
              <Route path='/Original' element={<Original/>}/>
              <Route path='/informativa' element={<Informativa/>}/>
              <Route path='/usuario' element={<Usuario/>}/>
              <Route path='/equipo/:equipo' element={<Equipo/>}/>
          </Routes>
      </Router>

    </>
  )
}

export default App
