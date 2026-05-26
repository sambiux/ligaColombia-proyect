import {

  BrowserRouter as Router,

  Route,

  Link,

  Routes

} from 'react-router';

import {

  useContext,

  useEffect,

  useState

} from 'react';



import {

  onAuthStateChanged,

  signOut

} from 'firebase/auth';

import type { User } from 'firebase/auth';

import { auth } from './firebase/firebaseConfig';



import {

  PerrosProvider,

  PerrosContext

} from './PerrosContext';



import Home from './Home/index';

import Favoritos from './Favoritos/index';

import Original from './Original/index';

import Informativa from './informativa/index';



import Login from './Auth/Login';

import Registro from './Auth/Registro';



import './App.css';





function Navbar() {

  const { favorites } =
    useContext(PerrosContext);



  return (

    <nav className='c-menu'>

      <Link to="/">
        Home
      </Link>

      <Link to="/Favoritos">
        Favoritos ({favorites.length})
      </Link>

      <Link to="/Original">
        Original
      </Link>

      <Link to="/informativa">
        Informativa
      </Link>



      <button
        onClick={() => signOut(auth)}
      >
        Cerrar sesión
      </button>

    </nav>

  );

}





function App() {

  const [usuario, setUsuario] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [mostrarRegistro,
    setMostrarRegistro] =
    useState(false);




  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(auth, (user) => {

        setUsuario(user);

        setLoading(false);

      });

    return () => unsubscribe();

  }, []);




  // CARGANDO

  if (loading) {

    return <h1>Cargando...</h1>;

  }




  // SI NO HAY LOGIN

  if (!usuario) {

    return (

      <div>

        {

          mostrarRegistro ?

            <Registro
              cambiarVista={() =>
                setMostrarRegistro(false)
              }
            />

            :

            <Login
              cambiarVista={() =>
                setMostrarRegistro(true)
              }
            />

        }

      </div>

    );

  }




  // SI HAY LOGIN

  return (

    <PerrosProvider>

      <Router>

        <Navbar />

        <Routes>

          <Route
            path='/'
            element={<Home />}
          />

          <Route
            path='/Favoritos'
            element={<Favoritos />}
          />

          <Route
            path='/Original'
            element={<Original />}
          />

          <Route
            path='/informativa'
            element={<Informativa />}
          />

        </Routes>

      </Router>

    </PerrosProvider>

  );

}

export default App;