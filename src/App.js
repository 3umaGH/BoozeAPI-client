import { BrowserRouter, Routes, Route } from "react-router-dom";
import PopularCocktails from "./pages/PopularCocktails";
import RandomCocktails from "./pages/RandomCocktails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PopularCocktails />} />
        <Route path="/random" element={<RandomCocktails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
