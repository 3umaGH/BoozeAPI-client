import React from "react";
import { Box } from "@mui/material";
import Layout from "../components/Layout/Layout";
import CocktailListFavorites from "../components/cocktail/CocktailListFavorites";

function Favorites({ favoritesList }) {
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
        <CocktailListFavorites />
      </Box>
    </Layout>
  );
}

export default Favorites;
