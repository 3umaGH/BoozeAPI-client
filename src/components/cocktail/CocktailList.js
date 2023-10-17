import { useState, useEffect } from "react";
import CocktailCard from "./CocktailCard";
import uuid from 'react-uuid';

const CocktailList = ({ fetchPromise, data }) => {
  const [cocktailData, setCocktailData] = useState();

  useEffect(() => {
    if (data !== undefined) setCocktailData(data);
    else
      fetchPromise.then((data) => {
        setCocktailData(data);
      });
  }, [fetchPromise, data]);

  return (
    <>
      {cocktailData &&
        cocktailData.drinks.map((drink) => {
          return (
            <CocktailCard key={uuid()} drink={drink}></CocktailCard>
          );
        })}
    </>
  );
};

export default CocktailList;
