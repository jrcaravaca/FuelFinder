import "./App.css";
import { Footer } from "./components/Footer/Footer.jsx";
import { Header } from "./components/Header/Header.jsx";
import { Main } from "./components/Main/Main.jsx";
import { useFuelData } from "./hooks/useFuelData.jsx";


function App() {
 
  const {data, loading} = useFuelData();   


  return (
    <>
      <Header />
      <Main data={data} loading={loading}/>
      <Footer />
    </>
  );
}

export default App;
