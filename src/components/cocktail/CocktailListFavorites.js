import { useState, useEffect } from "react";
import { fetchCocktail } from "../../workers/CocktailService";

import CocktailCard from "./CocktailCard";
import withFavorites from "../hoc/WithFavorites";
import uuid from "react-uuid";

const CocktailListFavorites = ({ favoritesList }) => {
  const [cocktailData, setCocktailData] = useState({drinks: []});

  useEffect(() => {
    favoritesList().forEach((favID) => { // API Does not support fetching cocktails using multiple ids... Have to fetch them one by one.
      fetchCocktail(false, favID).then((data) => {
        setCocktailData((prevData) => ({
          ...prevData,
          drinks: [...prevData.drinks, ...data.drinks],
        }));
      });
    });
  }, [favoritesList]);

  return (
    <>
      {cocktailData ? (
        cocktailData.drinks.map((drink) => {
          return <CocktailCard key={uuid()} drink={drink}></CocktailCard>;
        })
      ) : (
        <h1>You do not have any favorited drinks.</h1>
      )}
    </>
  );
};

export default withFavorites(CocktailListFavorites);
