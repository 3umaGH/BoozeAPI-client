import { Box, IconButton, Paper } from "@mui/material";
import { useEffect, useState } from "react";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 300);
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Box
      className="scroll-to-top"
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
      }}
    >
      {isVisible && (
        <Paper onClick={scrollToTop} elevation={2}>
          <IconButton aria-label="Scroll to top" onClick={() => scrollToTop()}>
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>
        </Paper>
      )}
    </Box>
  );
}
