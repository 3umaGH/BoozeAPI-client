import React from "react";
import { Box } from "@mui/material";
import Layout from "../components/Layout/Layout";
import CocktailList from "../components/cocktail/CocktailList";
import { fetchPopularCocktails } from "../workers/CocktailService";

function Main() {
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
        <CocktailList fetchPromise={fetchPopularCocktails()} />
      </Box>
    </Layout>
  );
}

export default Main;
