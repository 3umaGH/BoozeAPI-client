import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";

const Image = (props) => {
  const [imageLoaded, setLoaded] = useState(false);

  const loadHandler = () => {
    setLoaded(true);
  };

  useEffect(() => {});

  const imageStyle = imageLoaded ? props.style : { display: "none" };

  return (
    <div>
      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          sx={{ width: "auto", minHeight: "200px" }}
        />
      )}

      <img
        src={props.src}
        alt={props.alt}
        style={imageStyle}
        onLoad={loadHandler}
      ></img>
    </div>
  );
};

export default Image;
