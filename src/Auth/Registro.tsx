import { useState } from "react";
import "./Auth.css";

import {

  createUserWithEmailAndPassword,

  signOut

} from "firebase/auth";

import {

  doc,

  setDoc

} from "firebase/firestore";

import {

  auth,

  db

} from "../firebase/firebaseConfig";



type Props = {

  cambiarVista: () => void;

};



export default function Registro({
  cambiarVista
}: Props) {



  const [nombre, setNombre] =
    useState("");

  const [correo, setCorreo] =
    useState("");

  const [password, setPassword] =
    useState("");



  const registrar = async () => {

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          correo,
          password
        );



      const user =
        userCredential.user;



      await setDoc(
        doc(db, "usuarios", user.uid),
        {

          uid: user.uid,

          nombre,

          correo

        }
      );



      alert("Usuario registrado");



      // CERRAR SESION

      await signOut(auth);



      // VOLVER AL LOGIN

      cambiarVista();

    }

    catch (error: any) {

      alert(error.message);

    }

  };



  return (

    <div className="auth-container">

      <h1>Registro</h1>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) =>
          setNombre(e.target.value)
        }
      />

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

      <button onClick={registrar}>
        Registrarse
      </button>



      <p>

        ¿Ya tienes cuenta?

        <button onClick={cambiarVista}>
          Login
        </button>

      </p>

    </div>

  );

}