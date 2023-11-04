import React, { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import Layout from "../components/Layout/Layout";
import CocktailList from "../components/cocktail/CocktailList";
import { fetchPopularCocktails } from "../workers/CocktailService";
import { useState } from "react";
import QuerySearch from "../components/Layout/QuerySearch";
import { useHistory } from "react-router-dom";

import { fetchCocktailsBy } from "../workers/CocktailService";

function Main() {
  const [defaultData, setDefaultData] = useState();
  const [cocktailData, setCocktailData] = useState();

  const [isSearching, setSearching] = useState(false);

  const revertToDefault = () => {
    setCocktailData(defaultData);
  };

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
