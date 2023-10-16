import { Container } from "@mui/material";

import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";

const Layout = (props) => {
  return (
    <Container maxWidth={false}>
      <Navbar />
      {props.children}
      <Footer />
    </Container>
  );
};

export default Layout;
