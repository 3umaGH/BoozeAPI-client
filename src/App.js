import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PopularCocktails from "./pages/PopularCocktails";
import RandomCocktails from "./pages/RandomCocktails";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PopularCocktails />} />
        <Route path="/random" element={<RandomCocktails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
