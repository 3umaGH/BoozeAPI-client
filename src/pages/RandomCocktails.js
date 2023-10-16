import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import CocktailList from "../components/CocktailList";
import Layout from "../components/Layout/Layout";
import { fetch10RandomCocktails } from "../workers/CocktailService";

const RandomCocktails = () => {
  const [cocktailData, setCocktailData] = useState();

  useEffect(() => {
    fetch10RandomCocktails().then((data) => setCocktailData(data));

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
