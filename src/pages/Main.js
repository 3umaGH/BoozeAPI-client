import { Box, Container } from "@mui/material";

import Navbar from "../components/Navbar";
import CocktailList from "../components/CocktailList";

function Main() {
  return (
    <Container maxWidth={false}>
      <Navbar />

      <Box
        style={{ width: "100%" }}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <CocktailList />
      </Box>
    </Container>
  );
}

export default Main;
