import { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer/Footer.jsx";
import { Header } from "./components/Header/Header.jsx";
import { Main } from "./components/Main/Main.jsx";

const APIUrl = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/"





function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const CACHE_KEY = "fuelData"; 
    const CACHE_TIME = 30 * 60 * 1000; // 30 minutos

    async function loadData() {
      try {
        const cached = localStorage.getItem(CACHE_KEY)

        if (cached) {
          const parsed = JSON.parse(cached); 
          const isExpired = Date.now() - parsed.timeStamp > CACHE_TIME; 

          if (!isExpired) {
            setData(parsed.data)
            return; 
          }
        }
      
      const response = await fetch(APIUrl); 

      if(!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const result = await response.json()

      const cleanedData = result.ListaEESSPrecio.map(e => ({
        cp: e["C.P."],
        rotulo: e["Rótulo"],
        direccion: e["Dirección"],
        gasoil: e["Precio Gasoleo A"],
        gasolina: e["Precio Gasolina 95 E5"],
        id: e["IDEESS"],
        localidad: e["Localidad"],
      }));

      localStorage.setItem(
        CACHE_KEY, 
        JSON.stringify({
          timeStamp: Date.now(), 
          data: cleanedData,
        })
      )

      }catch(error) {
        console.error("Error al obtener los datos", error)
      }
    }
    loadData();

  },[])
    




  return (
    <>
      <Header />
      <Main data={data}/>
      <Footer />
    </>
  );
}

export default App;
