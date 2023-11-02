import React from "react";
import { Box, Container, Modal, Typography } from "@mui/material";
import Layout from "../components/Layout/Layout";
import CocktailList from "../components/cocktail/CocktailList";
import { fetchPopularCocktails } from "../workers/CocktailService";

function Main() {
  return (
    <Layout>
      <Container align="center" sx={{ mt: 3 }}>
        <Typography variant="h6">Popular Cocktails</Typography>
      </Container>
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
