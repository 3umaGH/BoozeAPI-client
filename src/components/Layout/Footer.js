import { Typography, Container } from "@mui/material";
import LocalBarIcon from "@mui/icons-material/LocalBar";

const Footer = () => {
  return (
    <Container align="center" sx={{ mt: 10 }}>
      <LocalBarIcon sx={{ mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        color="primary.light"
        sx={{
          mr: 2,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Cocktails Browser
      </Typography>

      <br />

      <Typography
        paragraph
        variant="h6"
        noWrap
        component="a"
        color="primary.light"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: 10,
          textDecoration: "none",

        }}
      >
        © 2023 3uma. All Rights Reserved.
      </Typography>
    </Container>
  );
};

export default Footer;
