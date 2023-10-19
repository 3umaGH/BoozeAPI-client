import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Layout from "../components/Layout/Layout";
import CocktailListFavorites from "../components/cocktail/CocktailListFavorites";

function Favorites({ favoritesList }) {
  return (
    <Layout>
      <Container align="center" sx={{ mt: 3 }}>
        <Typography variant="h6">Favorite Cocktails</Typography>
      </Container>
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
