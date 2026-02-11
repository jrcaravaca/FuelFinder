

export function StationCard({ rotulo, direccion, localidad, gasolina95, diesel, isLiked, onToggleFavorite,}) {
  
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${direccion}, ${localidad}, ${rotulo}`
)}`


  return (
    <div className="flex flex-col gap-2 border border-slate-300 rounded-xl p-4 w-full max-w-sm bg-white shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-center font-semibold text-lg text-slate-800">
        {rotulo}
      </h3>

      <p className="text-sm text-slate-600">
        <span className="font-medium text-slate-700">Localidad:</span>{" "}
        {localidad}
      </p>

      <p className="text-sm text-slate-600">
        <span className="font-medium text-slate-700">Dirección:</span>{" "}
        {direccion}
      </p>

      <p className="text-sm text-slate-600">
        <span className="font-medium text-slate-700">Gasolina 95:</span>{" "}
        <span className="text-green-600 font-semibold">{gasolina95} €</span>
      </p>

      <p className="text-sm text-slate-600">
        <span className="font-medium text-slate-700">Diésel:</span>{" "}
        <span className="text-blue-600 font-semibold">{diesel} €</span>
      </p>

      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver en Google Maps</a>
      
      <button className="self-center" onClick={onToggleFavorite}>
        <img src={!isLiked ? "../../../../like.svg" : "../../../../filled-like.svg"} alt="like" className="h-8"/>
      </button>
    </div>
  );
}
