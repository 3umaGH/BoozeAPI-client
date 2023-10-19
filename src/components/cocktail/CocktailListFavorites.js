import { useState, useEffect } from "react";
import CocktailCard from "./CocktailCard";
import uuid from "react-uuid";

import { fetchCocktail } from "../../workers/CocktailService";
import withFavorites from "../hoc/WithFavorites";

const CocktailListFavorites = ({ favoritesList }) => {
  const [cocktailData, setCocktailData] = useState();

  useEffect(() => {
    const drinkDataArray = [];

    favoritesList().forEach((favID) => {
      fetchCocktail(false, favID).then((data) => {
        drinkDataArray.push(data.drinks[0]);
        setCocktailData({ drinks: drinkDataArray });
      });
    });
  }, [favoritesList]);

  return (
    <>
      {console.log("data", cocktailData)}

      {cocktailData &&
        cocktailData.drinks.map((drink) => {
          return <CocktailCard key={uuid()} drink={drink}></CocktailCard>;
        })}
    </>
  );
};

export default withFavorites(CocktailListFavorites);
