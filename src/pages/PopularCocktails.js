import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import Layout from "../components/Layout/Layout";
import CocktailList from "../components/cocktail/CocktailList";
import QuerySearch from "../components/Layout/QuerySearch";

import { useLocation } from "react-router-dom";

import {
  fetchPopularCocktails,
  fetchCocktailsBy,
} from "../workers/CocktailService";

function Main() {
  const [defaultData, setDefaultData] = useState();
  const [cocktailData, setCocktailData] = useState();
  const [isSearching, setSearching] = useState(false);
  const location = useLocation();

  const revertToDefault = useCallback(() => {
    setCocktailData(defaultData);
  }, [defaultData]);

  const handleSearchQueryUpdate = (
    name,
    category,
    glassType,
    ingredients,
    alcoholic
  ) => {
    setSearching(true);

    fetchCocktailsBy(name, category, glassType, ingredients, alcoholic).then(
      (data) => {
        setCocktailData(data);
        setSearching(false);
      }
    );
  };

  useEffect(() => {
    fetchPopularCocktails().then((data) => {
      setDefaultData(data);
      setCocktailData(data);
    });
  }, []);

  useEffect(() => {
   revertToDefault();
  }, [location, revertToDefault]);

  const loadingElement = <Typography variant="h5">Loading...</Typography>;

  const searchingElement = <Typography variant="h5">Searching...</Typography>;

  const notFoundElement = <Typography variant="h5">Nothing found</Typography>;

  return (
    <Layout>
      <QuerySearch
        queryCallback={handleSearchQueryUpdate}
        emptySearchCallback={revertToDefault}
      />

      <Box
        style={{ width: "100%" }}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {cocktailData ? (
          cocktailData.message === "Drinks not found" ? (
            notFoundElement
          ) : isSearching ? (
            searchingElement
          ) : (
            <CocktailList data={cocktailData} />
          )
        ) : (
          loadingElement
        )}
      </Box>
    </Layout>
  );
}

export default Main;
