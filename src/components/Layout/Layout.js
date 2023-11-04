import { Box } from "@mui/material";

import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = (props) => {
  return (
    <Box sx={{ mt: 10 }}>
      <Navbar />
      {props.children}
      <ScrollToTop/>
      <Footer />
    </Box>
  );
};

export default Layout;
