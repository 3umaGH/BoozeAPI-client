import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "80vh",
  maxWidth: "600px",
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 2,

  overflow: "auto",
};

export default function BasicModal({ closeCallback, children }) {
  return (
    <Modal
      open={true}
      onClose={closeCallback}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container sx={style}>{children}</Container>
    </Modal>
  );
}
