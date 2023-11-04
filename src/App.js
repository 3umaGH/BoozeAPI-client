import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PopularCocktails from "./pages/PopularCocktails";
import RandomCocktails from "./pages/RandomCocktails";
import Favorites from "./pages/Favorites";
import SingleCocktail from "./pages/SingleCocktail";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

function App() {
  ReactGA.initialize("G-2F34VXJKRN");

  const location = useLocation();
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PopularCocktails />} />
        <Route path="/random" element={<RandomCocktails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cocktail/:cocktailID" element={<SingleCocktail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
