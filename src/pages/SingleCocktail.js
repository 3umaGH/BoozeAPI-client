import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import Layout from "../components/Layout/Layout";
import CocktailList from "../components/cocktail/CocktailList";
import { fetchCocktail } from "../workers/CocktailService";

function SingleCocktail(props) {
  const { cocktailID } = useParams();

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
        {!isNaN(Number(cocktailID)) ? (
          <CocktailList
            fetchPromise={fetchCocktail(false, [cocktailID])}
          />
        ) : (
          <Typography sx={{mt:4}} variant="h6">Cocktail not found</Typography>
        )}
      </Box>
    </Layout>
  );
}

export default SingleCocktail;
