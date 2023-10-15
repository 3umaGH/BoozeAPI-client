import { Box, Container } from "@mui/material";

import Navbar from "../components/Navbar";
import App from "../App";
import Cocktail from "../components/cocktail/Cocktail";

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
        <Cocktail getRandom={true} />
        <Cocktail getRandom={true} />
        <Cocktail getRandom={true} />
        <Cocktail getRandom={true} />
        <Cocktail getRandom={true} />
        <Cocktail getRandom={true} />

        
      </Box>
    </Container>
  );
}

export default Main;
