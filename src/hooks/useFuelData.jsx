import { useEffect, useState } from "react";

// URL de la API pública del Ministerio con los precios de los carburantes
const APIUrl =
  "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/";

export function useFuelData() {
  // Estado que almacena los datos de las gasolineras
  const [data, setData] = useState([]);

  // Estado para controlar si se han descargado los datos
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CACHE_KEY = "fuelData";
    const CACHE_TIME = 30 * 60 * 1000; // 30 minutos en milisegundos

    // Obtener los datos desde la caché (si es válida) o desde la API
    async function loadData() {
      try {
        // Intenta leer los datos guardados en localStorage
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
          const parsed = JSON.parse(cached);

          // Comprueba si los datos han caducado (con el timestamp de la fecha de ese momento, y la de los datos guardados)
          const isExpired = Date.now() - parsed.timeStamp > CACHE_TIME;

          // Si el caché es valido (tiempo inferior a 30 minutos), utiliza esos datos
          if (!isExpired) {
            setData(parsed.data);
            setLoading(false);
            return;
          }
        }

        // Si no hay caché o está caducado, pedimos los datos a la API
        const response = await fetch(APIUrl);

        // Manejo de errores
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();

        // Normalización de los datos que devuelve la API
        // (renombro propiedades y nos quedamos solo con las necesarias)
        const cleanedData = result.ListaEESSPrecio.map((e) => ({
          cp: e["C.P."],
          rotulo: e["Rótulo"],
          direccion: e["Dirección"],
          gasoil: e["Precio Gasoleo A"],
          gasolina: e["Precio Gasolina 95 E5"],
          id: e["IDEESS"],
          localidad: e["Localidad"],
        }));

        // Guarda los datos en el estado
        setData(cleanedData);
        setLoading(false);

        // Guarda los datos en localStorage, junto con un timestamp
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timeStamp: Date.now(),
            data: cleanedData,
          }),
        );
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    }

    //Ejecuta la carga de datos al montar el componente
    loadData();
  }, []);

  return { data, loading };
}
