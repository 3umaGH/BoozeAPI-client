import { Box } from "@mui/material";

import CocktailList from "../components/CocktailList";
import Layout from "../components/Layout/Layout";
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
