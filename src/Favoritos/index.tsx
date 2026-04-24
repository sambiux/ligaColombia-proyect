import { useContext } from "react";
import { PerrosContext } from "../PerrosContext";
import "./style.css";

export default function Favoritos() {
  const { favorites, toggleFavorite } = useContext(PerrosContext);

  return (
    <div className="favoritos-content">
      <h1>Mis Favoritos</h1>
      {favorites.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "50px" }}>No hay favoritos.</p>
      ) : (
        <div className="containerCards">
          {favorites.map((item) => (
            <div className="perros-cards" key={item.id}>
              <img src={item.url} alt="perro" />
              <button onClick={() => toggleFavorite(item)} className="btn-quitar">
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}