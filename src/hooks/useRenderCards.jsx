import { textCardData } from "../CONST/textCardData";
import { TextCard } from "../components/TextCard/TextCard";
import { StationCard } from "../components/StationCard/StationCard";

export function useRenderCards(data, favorites, toggleFavorite, searchItem, ) {


    const renderTextCard = () => {
        return (
        textCardData.map(data => {
        return(
            <TextCard title={data.title} text={data.text} src={data.src} key={data.id} />
        )
        })
    )
    }

    const renderStationCard = () => {
        const search = searchItem.trim().toLowerCase()
    
        const filteredData = data.filter(gasolinera => {
          if (/^\d+$/.test(search)) {
            // es código postal
            return gasolinera.cp === search
          } else {
            // es ciudad
            return gasolinera.localidad.toLowerCase().includes(search)
          }
    })
        
        if (filteredData.length === 0) {
          return (
            <h2>No hay resultados para tu busqueda</h2>
          )
        }
        return (
          filteredData.map(station => {
            
            return (
              <StationCard 
                  rotulo={station.rotulo}
                  localidad={station.localidad}
                  direccion={station.direccion}
                  gasolina95={station.gasolina}
                  diesel={station.gasoil}
                  id={station.id}
                  key={station.id}
                  isLiked={favorites.some(f => f.id === station.id)}
                  onToggleFavorite ={() => toggleFavorite(station)}
                  />
            )
          })
        
        )
    }

    return {renderStationCard, renderTextCard}
}