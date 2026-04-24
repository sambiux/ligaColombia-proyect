import { useEffect, useState, useContext } from "react";
import { PerrosContext } from "../PerrosContext";
import type { userData } from "../PerrosContext"; 
import "./style.css";

export default function Home() {
  const [data, setData] = useState<userData[]>([]);
  // Usamos el contexto correctamente
  const { toggleFavorite, isFavorite } = useContext(PerrosContext);

  useEffect(() => {
    fetch(`https://api.thedogapi.com/v1/images/search?limit=10`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="home-content">
      <h1>Cartas Perros</h1>
      <div className="containerCards">
        {data.map((item) => {
          const esFav = isFavorite(item.id);
          return (
            <div className="perros-cards" key={item.id}>
              <img src={item.url} alt="perro" />
              <p>altura: {item.height}</p>
              <button 
                onClick={() => toggleFavorite(item)} 
                className={esFav ? 'btn-quitar' : 'btn-agregar'}
              >
                {esFav ? 'Quitar de favoritos' : 'Agregar a Favoritoa'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}