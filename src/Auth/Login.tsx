import { useState } from "react";
import "./Auth.css";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";

type Props = {

  cambiarVista: () => void;

};

export default function Login({
  cambiarVista
}: Props) {

  const [correo, setCorreo] =
    useState("");

  const [password, setPassword] =
    useState("");



  const iniciarSesion = async () => {

    try {

      await signInWithEmailAndPassword(
        auth,
        correo,
        password
      );

      alert("Sesión iniciada");

    }

    catch (error: any) {

      alert(error.message);

    }

  };



  return (

    <div className="auth-container">

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) =>
          setCorreo(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={iniciarSesion}>
        Ingresar
      </button>


      <p>

        ¿No tienes cuenta?

        <button onClick={cambiarVista}>
          Registrarse
        </button>

      </p>

    </div>

  );

}