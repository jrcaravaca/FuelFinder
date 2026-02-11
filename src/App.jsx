import { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer/Footer.jsx";
import { Header } from "./components/Header/Header.jsx";
import { Main } from "./components/Main/Main.jsx";
import { useFuelData } from "./hooks/useFuelData.jsx";

function App() {
  // Llamada a hook useFuelData
  const { data, loading } = useFuelData();

  //Estado para guardar favoritos, se inicia leyendo desde localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Funcion para añadir / quitar una gasolinera de favoritos
  const toggleFavorite = (station) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === station.id);
      if (exists) return prev.filter((f) => f.id !== station.id);
      return [...prev, station];
    });
  };

  // Guardamos favoritos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  console.log(favorites);

  return (
    <>
      <Header />
      <Main
        data={data}
        loading={loading}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      <Footer />
    </>
  );
}

export default App;
