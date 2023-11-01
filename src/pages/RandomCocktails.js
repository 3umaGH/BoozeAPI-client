import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import Layout from "../components/Layout/Layout";
import CocktailList from "../components/cocktail/CocktailList";
import { fetchRandomCocktails } from "../workers/CocktailService";

const RandomCocktails = () => {
  const [cocktailData, setCocktailData] = useState();

  useEffect(() => {
    fetchRandomCocktails().then((data) => {
      setCocktailData(data);
    });

    const handleScroll = debounce(() => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 700
      )
        loadMore();
    }, 30);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const loadMore = () => {
    fetchRandomCocktails().then((data) => {
      setCocktailData((prevData) => [...prevData, ...data]);

    });
  };

  return (
    <Layout>
      <Container align="center" sx={{ mt: 3 }}>
        <Typography variant="h6">Random Cocktails</Typography>
      </Container>
      <Box
        style={{ width: "100%" }}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {cocktailData && <CocktailList data={cocktailData} />}
      </Box>
    </Layout>
  );
};

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default RandomCocktails;
