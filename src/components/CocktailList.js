import { useState, useEffect } from "react";
import CocktailCard from "../components/cocktail/CocktailCard";
import { fetchPopularCocktails } from "../workers/CocktailService";

const CocktailList = () => {
  const [cocktailData, setCocktailData] = useState();

  useEffect(() => {
    fetchPopularCocktails(true, null).then((data) => {
      setCocktailData(data);
    });
  }, []);

  return (
    <>
      {cocktailData && (
        cocktailData.drinks.map((drink) => {
           return <CocktailCard key={drink.idDrink} drink={drink}></CocktailCard>
        })
      )}
      <div></div>
    </>
  );
};

export default CocktailList;
