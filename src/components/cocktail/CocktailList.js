import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import CocktailCard from "./CocktailCard";
import uuid from "react-uuid";

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
      {cocktailData && Array.isArray(cocktailData) ? (
        cocktailData.map((drink) => (
          <CocktailCard key={uuid()} drink={drink} />
        ))
      ) : (
        <Typography variant="h6">{errorMessage}</Typography>
      )}
    </>
  );
};

export default CocktailList;
