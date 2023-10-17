import { Box } from "@mui/material";

const Modal = ({ closeCallback, ...props }) => {
  const style = {
    textAlign: "center",
    width: "20rem",
    zIndex: 10,
    position: "fixed",
    top: "10vh",
    left: "calc(50% - 10rem)",
    maxHeight: "80vh",
    overflowY: "auto",
    
    scrollbarWidth: "none", // Hide the scrollbar for firefox
    '&::WebkitScrollbar': {
        display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
    },
    '&MsOverflowStyle:': {
        display: 'none', // Hide the scrollbar for IE
    },

  };

  return <Box style={style}>{props.children}</Box>;
};

export default Modal;
