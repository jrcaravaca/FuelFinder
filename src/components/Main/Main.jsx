import { TextCard } from "../TextCard/TextCard";
import { textCardData } from "../../CONST/textCardData";
import { Hero } from "./components/Hero";
import { useState } from "react";
import data from "../../../data.json";
import { StationCard } from "../StationCard/StationCard";

export function Main() {
  const [isSearching, setIsSearching] = useState(false)

  const renderTextCard = () => {
    return (
    textCardData.map(data => {
      return(
        <TextCard title={data.title} text={data.text} src={data.src} key={data.id} />
      )
    })
   )
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setIsSearching(true)
    
  }
  console.log("DATA:", data)
  console.log("LISTA:", data.ListaEESSPrecio)

  const renderStationCard = () => {
    return (
      data.ListaEESSPrecio.map(station => {
        
        return (
          <StationCard 
              rotulo={station["Rótulo"]}
              direccion={station["Dirección"]}
              gasolina95={station["Precio Gasolina 95 E5"]}
              diesel={station["Precio Gasoleo A"]}
              key={station.IDEESS}
              />
        )
      })
    )
  }

  return (
    <main className="pb-8 mx-4">
      <Hero />
      <section id="formSection">
        <form
          action="#"
          className="flex flex-col justify-center items-center gap-4 sm:max-w-96 sm:mx-auto"
          onSubmit={handleSearch}
        >
          <div className="border rounded-xl p-2 w-full flex gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
            <input
              type="text"
              placeholder="Ciudad o  código postal..."
              className="w-full"
            />
          </div>
          <button className="shadow-lg border-b-4 border-blue-800 bg-blue-500 text-white rounded-xl p-2 w-full flex justify-center items-center cursor-pointer hover:bg-blue-500 active:border-b-2 active:translate-y-0.5 transition-all">
            Buscar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              width="20px"
              height="16px"
              viewBox="0 0 24 24"
            >
              <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z" />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"
              />
            </svg>
          </button>
        </form>
      </section>

      <section id="cardSection" className="flex flex-col flex-wrap gap-2 mt-8 mb-4 items-center justify-center sm:flex-row">
        {

         isSearching ? renderStationCard() : renderTextCard()
              
        
        }
      </section>
    </main>
  );
}

