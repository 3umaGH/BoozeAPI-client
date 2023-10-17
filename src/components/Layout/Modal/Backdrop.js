const style = {
  position: "fixed",
  zIndex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  width: "100%",
  height: "100vh",
  top: 0,
  left: 0,
};

const Backdrop = ({ onClick, ...props }) => {
  return (
    <div style={style} onClick={onClick}>
      {props.children}
    </div>
  );
};

export default Backdrop;
