import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

import CocktailList from "../components/cocktail/CocktailList";
import Layout from "../components/Layout/Layout";
import { fetchCocktailsBy } from "../workers/CocktailService";
import SearchBar from "../components/Layout/QuerySearch";
import CocktailTable from "../components/cocktail/CocktailTable";

function Search() {
  const [cocktailData, setCocktailData] = useState();

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get("name");

  useEffect(() => {
    /* if (query !== undefined)
      fetchCocktailsBy(query).then((data) => {
        setCocktailData(data);
      });*/
  }, [query]);

  const handleSearchQueryUpdate = (
    category,
    glassType,
    ingredients,
    alcoholic
  ) => {
    fetchCocktailsBy(undefined, category, glassType, undefined, alcoholic).then(
      (data) => {
        setCocktailData(data);
      }
    );
  };

  return (
    <Layout>
      <SearchBar queryCallback={handleSearchQueryUpdate} />

      <Box
        style={{ width: "100%" }}
        align="center"
  
      >
        {cocktailData === undefined || cocktailData.drinks === null ? (
          <h1>No results according to your search query.</h1>
        ) : (
          <CocktailTable data={cocktailData}></CocktailTable>
        )}
        
        {/*
        {cocktailData === undefined || cocktailData.drinks === null ? (
          <h1>No results according to your search query.</h1>
        ) : (
          <CocktailList data={cocktailData} />
        )}*/}
      </Box>
    </Layout>
  );
}

export default Search;
