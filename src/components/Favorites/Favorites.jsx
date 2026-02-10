import { StationCard } from "../StationCard/StationCard"


export function Favorites({favorites, toggleFavorite}) {

    

    if(favorites.length == 0) {
        return <h2>No tienes favoritos todavía</h2>
    }

    return (
        <>
        {

            favorites.map((station) => {
                return(
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
        
        }
      </>
    )
}