import { useState, useEffect } from "react";
import { fetchCocktail } from "../../workers/CocktailService";

import CocktailCard from "./CocktailCard";
import withFavorites from "../hoc/WithFavorites";
import uuid from "react-uuid";
import CocktailList from "./CocktailList";

const CocktailListFavorites = ({ favoritesList }) => {
  const [cocktailData, setCocktailData] = useState();

  useEffect(() => {
    if (favoritesList().length > 0)
      fetchCocktail(false, favoritesList()).then((data) => {
        setCocktailData(data);
      });
  }, [favoritesList]);

  return (
    <>
      {cocktailData ? (
        <CocktailList data={cocktailData} />
      ) : favoritesList().length === 0 ? (
        <h1>You do not have any favorited drinks.</h1>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default withFavorites(CocktailListFavorites);
