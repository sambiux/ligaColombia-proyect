import { useEffect, useState } from "react";
import "./style.css";

interface DogData {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default function Informativa() {
  const [datos, setDatos] = useState<DogData[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("https://api.thedogapi.com/v1/images/search?limit=20")
      .then((res) => res.json())
      .then((json) => {
        setDatos(json);
        setCargando(false);
      });
  }, []);

  
  let perroMasGrande = datos[0];
  let sumaAreas = 0;

  for (let i = 0; i < datos.length; i++) {
    
    if ((datos[i].width * datos[i].height) > (perroMasGrande.width * perroMasGrande.height)) {
      perroMasGrande = datos[i];
    }
    sumaAreas += (datos[i].width * datos[i].height);
  }

  const promedioArea = datos.length > 0 ? Math.round(sumaAreas / datos.length) : 0;

  if (cargando) return <p className="loading">Analizando datos de la API...</p>;

  return (
    <div className="informativa-page">
      <h1>Panel Informativo de Datos</h1>
      <p>Análisis técnico de los últimos {datos.length} perros obtenidos.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Promedio de Tamaño</h3>
          <p className="stat-value">{promedioArea} px²</p>
          <span>Área media de imagen</span>
        </div>

        <div className="stat-card highlight-blue">
          <h3>Perro Líder (Más Grande)</h3>
          {perroMasGrande && (
            <>
              <img src={perroMasGrande.url} alt="Grande" className="mini-img" />
              <p>{perroMasGrande.width} x {perroMasGrande.height}</p>
            </>
          )}
        </div>
      </div>

      <div className="tabla-tecnica">
        <h2>Registro Detallado</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ancho (px)</th>
              <th>Alto (px)</th>
              <th>Relación de Aspecto</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.width}</td>
                <td>{d.height}</td>
                <td>{(d.width / d.height).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}