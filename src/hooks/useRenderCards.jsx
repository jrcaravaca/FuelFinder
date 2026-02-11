import { textCardData } from "../CONST/textCardData.js";
import { TextCard } from "../components/TextCard/TextCard.jsx";
import { StationCard } from "../components/StationCard/StationCard.jsx";

export function useRenderCards(data, favorites, toggleFavorite, searchItem) {
  // Hook encargado de renderizar las tajretas de texto iniciales y las gasolineras filtradas por búsqueda

  // Renderiza las tarjetas informativas iniciales usando los datos guardados en CONST/textCardData.js
  const renderTextCard = () => {
    return textCardData.map((data) => {
      return (
        <TextCard
          title={data.title}
          text={data.text}
          src={data.src}
          key={data.id}
        />
      );
    });
  };

  // Renderiza las tarjetas de gasolineras filtradas, según el valor introducido en el buscador
  const renderStationCard = () => {
    // Normaliza el texto de búsqueda
    const search = searchItem.trim().toLowerCase();

    // Diferencia según si el usuario busca por CP o por ciudad
    const filteredData = data.filter((gasolinera) => {
      // Si solo tiene números -> lo trata como código postal
      if (/^\d+$/.test(search)) {
        
        return gasolinera.cp === search;
      }
      // Si contiene letras -> lo trata como ciudad
      else {
        return gasolinera.localidad.toLowerCase().includes(search);
      }
    });

    // Si no hay resultados muestra mensaje de error
    if (filteredData.length === 0) {
      return <h2>No hay resultados para tu busqueda</h2>;
    }
    // Si hay resultados, renderiza una StationCard por cada gasolinera
    return filteredData.map((station) => {
      return (
        <StationCard
          rotulo={station.rotulo}
          localidad={station.localidad}
          direccion={station.direccion}
          gasolina95={station.gasolina}
          diesel={station.gasoil}
          id={station.id}
          key={station.id}
          isLiked={favorites.some((f) => f.id === station.id)}
          onToggleFavorite={() => toggleFavorite(station)}
        />
      );
    });
  };

  return { renderStationCard, renderTextCard };
}
