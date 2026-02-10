import { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer/Footer.jsx";
import { Header } from "./components/Header/Header.jsx";
import { Main } from "./components/Main/Main.jsx";
import { useFuelData } from "./hooks/useFuelData.jsx";


function App() {
  const {data, loading} = useFuelData();  

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });


const toggleFavorite = (station) => {
  setFavorites(prev => {
    const exists = prev.some(f => f.id === station.id);
    if (exists) return prev.filter(f => f.id !== station.id);
    return [...prev, station];
  });
};
  
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  console.log(favorites)

  return (
    <>
      <Header />
      <Main data={data} loading={loading} favorites={favorites} toggleFavorite={toggleFavorite}/>
      <Footer />
    </>
  );
}

export default App;
