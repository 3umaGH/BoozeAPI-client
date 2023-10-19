import { useState, useEffect } from "react";
import CocktailCard from "./CocktailCard";
import uuid from "react-uuid";
import { Typography } from "@mui/material";

const CocktailList = ({ fetchPromise, data, errorMessage }) => {
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
      {cocktailData && cocktailData.drinks ? (
        cocktailData.drinks.map((drink) => (
          <CocktailCard key={uuid()} drink={drink} />
        ))
      ) : (
        <Typography variant="h6">{errorMessage}</Typography>
      )}
    </>
  );
};

export default CocktailList;
