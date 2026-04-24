import { useEffect, useState } from "react";
import "./style.css";

interface DogData {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default function Original() {
  const [perros, setPerros] = useState<DogData[]>([]);
  const [seleccionados, setSeleccionados] = useState<DogData[]>([]);

 
  useEffect(() => {
    fetch("https://api.thedogapi.com/v1/images/search?limit=12")
      .then((res) => res.json())
      .then((data) => setPerros(data))
      .catch((err) => console.error("Error original:", err));
  }, []);

  
  const seleccionarPerro = (perro: DogData) => {
    
    let yaExiste = false;
    for (let i = 0; i < seleccionados.length; i++) {
      if (seleccionados[i].id === perro.id) {
        yaExiste = true;
        break;
      }
    }

    if (yaExiste) {
      const nuevo = seleccionados.filter(p => p.id !== perro.id);
      setSeleccionados(nuevo);
    } else if (seleccionados.length < 2 ) {
      setSeleccionados([...seleccionados, perro]);
    }
  };

  return (
    <div className="original-container">
      <h1>Comparacion perros</h1>
      <p>Selecciona 2 perros para comparar su tamaño</p>

      
      <div className="comparison-panel">
        {seleccionados.length === 2 ? (
          <div className="battle-arena">
            <div className="dog-box">
              <img src={seleccionados[0].url} alt="Dog 1" />
              <p>{seleccionados[0].height}</p>
            </div>
            <div className="vs-circle">VS</div>
            <div className="dog-box">
              <img src={seleccionados[1].url} alt="Dog 2" />
              <p>{seleccionados[1].height}</p>
            </div>
            <button onClick={() => setSeleccionados([])}>Limpiar</button>
          </div>
        ) : (
          <div className="waiting-message">
            {seleccionados.length === 1 ? "Selecciona otro perro..." : "Elige dos perros de la lista abajo"}
          </div>
        )}
      </div>

      
      <div className="containerCards">
        {perros.map((perro) => {
          let estaSeleccionado = false;
          for(let p of seleccionados) if(p.id === perro.id) estaSeleccionado = true;

          return (
            <div 
              key={perro.id} 
              className={`perros-cards ${estaSeleccionado ? 'highlight' : ''}`}
              onClick={() => seleccionarPerro(perro)}
              style={{ cursor: 'pointer' }}
            >
              <img src={perro.url} alt="dog" />
              <div className="stats-overlay">
                <span>{estaSeleccionado ? "Seleccionado" : "Click para comparar"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}