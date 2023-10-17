import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Layout from "../components/Layout/Layout";
import CocktailList from "../components/cocktail/CocktailList";
import { fetch10RandomCocktails } from "../workers/CocktailService";

const RandomCocktails = () => {
  const [cocktailData, setCocktailData] = useState();

  useEffect(() => {
    //Api supports only fetching 10 random cocktails, so gonna use nest to populate page a bit more.
    fetch10RandomCocktails().then((data) => {
      setCocktailData(data);

      fetch10RandomCocktails().then((data) => {
        setCocktailData((prevData) => ({
          ...prevData,
          drinks: [...prevData.drinks, ...data.drinks],
        }));
      });
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
    fetch10RandomCocktails().then((data) => {
      setCocktailData((prevData) => ({
        ...prevData,
        drinks: [...prevData.drinks, ...data.drinks],
      }));
    });
  };

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
