import { useState } from "react";
import "./style.css";

export default function Usuario() {
  // Estados para manejar el formulario y el perfil
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [perfilGuardado, setPerfilGuardado] = useState(false);

  // Datos del perfil una vez guardado
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "Invitado",
    email: "correo@ejemplo.com",
    bio: "¡Aún no has escrito nada sobre ti!",
    avatar: "https://placedog.net/200/200" // Imagen por defecto
  });

  const manejarGuardado = (e: React.FormEvent) => {
    e.preventDefault();
    setDatosUsuario({
      nombre: nombre || "Usuario Anónimo",
      email: email || "sin@correo.com",
      bio: bio || "Sin biografía",
      avatar: `https://placedog.net/200/200?id=${Math.floor(Math.random() * 100)}` 
    });
    setPerfilGuardado(true);
  };

  return (
    <div className="usuario-container">
      <h1>Perfil de Usuario</h1>

      <div className="perfil-layout">
        {/* Lado Izquierdo: Vista del Perfil */}
        <div className="perfil-card">
          <div className="avatar-frame">
            <img src={datosUsuario.avatar} alt="Avatar" />
          </div>
          <h2>{datosUsuario.nombre}</h2>
          <p className="user-email">{datosUsuario.email}</p>
          <div className="user-bio">
            <p>{datosUsuario.bio}</p>
          </div>
          <button 
            className="btn-edit" 
            onClick={() => setPerfilGuardado(false)}
          >
            {perfilGuardado ? "Editar Perfil" : "Viendo vista previa"}
          </button>
        </div>

        {/* Lado Derecho: Formulario de Edición */}
        {!perfilGuardado && (
          <div className="form-card">
            <h3>Actualizar Información</h3>
            <form onSubmit={manejarGuardado}>
              <div className="input-group">
                <label>Nombre Completo</label>
                <input 
                  type="text" 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)} 
                  placeholder="Tu nombre..."
                />
              </div>

              <div className="input-group">
                <label>Correo Electrónico</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div className="input-group">
                <label>Sobre ti (Bio)</label>
                <textarea 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)} 
                  placeholder="Cuéntanos algo..."
                />
              </div>

              <button type="submit" className="btn-save">Guardar Cambios</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}