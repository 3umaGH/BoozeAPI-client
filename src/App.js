import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PopularCocktails from "./pages/PopularCocktails";
import RandomCocktails from "./pages/RandomCocktails";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import SingleCocktail from "./pages/SingleCocktail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PopularCocktails />} />
        <Route path="/random" element={<RandomCocktails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cocktail/:cocktailID" element={<SingleCocktail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
