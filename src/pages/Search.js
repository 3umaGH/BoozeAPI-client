import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout/Layout";

import {
  fetchCocktailsBy,
  fetchCocktailsByName,
} from "../workers/CocktailService";
import QuerySearch from "../components/Layout/QuerySearch";
import CocktailList from "../components/cocktail/CocktailList";

function Search() {
  const [cocktailData, setCocktailData] = useState();
  const [loading, setLoading] = useState(false);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get("name");

  useEffect(() => {
    if (query && query !== null)
      fetchCocktailsByName(query).then((data) => setCocktailData(data));
  }, [query]);

  const handleSearchQueryUpdate = (
    category,
    glassType,
    ingredients,
    alcoholic
  ) => {
    setLoading(true);

    fetchCocktailsBy(category, glassType, ingredients, alcoholic).then((data) => {
      setCocktailData(data);
      setLoading(false);
    });
  };

  return (
    <Layout>
      <QuerySearch queryCallback={handleSearchQueryUpdate} />

      <Box
        style={{ width: "100%" }}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        align="center"
      >
        {loading ? (
          <h3 style={{ marginTop: "50px", width: "100%" }}>Loading...</h3>
        ) : cocktailData === undefined ||
          cocktailData.message === "Drinks not found" ? (
          <h3 style={{ marginTop: "50px" }}>
            No results, try using less search parameters.
          </h3>
        ) : (
          <CocktailList data={cocktailData}></CocktailList>
        )}
      </Box>
    </Layout>
  );
}

export default Search;
