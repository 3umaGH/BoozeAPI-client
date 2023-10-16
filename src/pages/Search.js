import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

import CocktailList from "../components/cocktail/CocktailList";
import Layout from "../components/Layout/Layout";
import { fetchCocktailsByName } from "../workers/CocktailService";

function Search() {
  const [cocktailData, setCocktailData] = useState();

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get("query");

  useEffect(() => {
    if (query !== undefined)
      fetchCocktailsByName(query).then((data) => {

        setCocktailData(data);
        console.log(data)


      });
  }, [query]);

  return (
    <Layout>
      <Box
        style={{ width: "100%" }}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {cocktailData === undefined || cocktailData.drinks === null ? (
          <h1>No results according to your search query.</h1>
        ) : (
          <CocktailList data={cocktailData} />
        )}
      </Box>
    </Layout>
  );
}

export default Search;
