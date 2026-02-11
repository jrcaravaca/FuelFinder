import { Hero } from "./components/Hero";
import { useState } from "react";
import { useRenderCards } from "../../hooks/useRenderCards";
import { Favorites } from "../Favorites/Favorites";

export function Main({data, loading, favorites,  toggleFavorite}) {
  const [isSearching, setIsSearching] = useState(false)
  const [renderFavorites, setRenderFavorites] = useState(false)
  const [searchItem, setSearchItem] = useState("")
  const [inputValue, setInputValue] = useState("")
  const {renderStationCard, renderTextCard} = useRenderCards(data, favorites, toggleFavorite, searchItem)
  
 

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchItem(inputValue)
    setIsSearching(true)
    
  }

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center py-20">
        <p className="text-lg">Cargando precios de carburante…</p>
        <p className="text-sm text-gray-500">Esto puede tardar unos segundos</p>
      </main>
  );

  }

  const handleFavorites = (e) => {
    e.preventDefault()
    setRenderFavorites(true)
    setIsSearching(false) 
    setInputValue("") 
  }

  return (
    <main className="pb-8 mx-4 flex flex-col justify-center gap-2">
      <Hero />
      <section id="formSection">
        <form
          name="search form"
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
              value={inputValue}
              placeholder="Ciudad o  código postal..."
              className="w-full"
              onChange={(e) => setInputValue(e.target.value)}
              required
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

                  <button 
            onClick={handleFavorites}
            className="shadow-lg border-b-4 border-red-800 bg-red-500 text-white rounded-xl p-2 w-full flex justify-center items-center cursor-pointer hover:bg-red-500 active:border-b-2 active:translate-y-0.5 transition-all">
            Favoritos
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
         
            isSearching
              ? renderStationCard() 
              : renderFavorites
                ? <Favorites favorites={favorites} toggleFavorite={toggleFavorite} /> 
                : renderTextCard() 
              
        }
      </section>
    </main>
  );
}

