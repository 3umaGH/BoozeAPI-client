import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";

const Image = ({ minSkeletonHeight = 200, ...props }) => {
  const [imageLoaded, setLoaded] = useState(false);

  const loadHandler = () => {
    setLoaded(true);
  };

  const imageStyle = imageLoaded ? props.style : { display: "none" };

  return (
    <div>
      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          sx={{ width: "auto", minHeight: `${minSkeletonHeight}px` }}
        />
      )}

      <img
        onLoad={loadHandler}
        src={props.src}
        alt={props.alt}
        style={imageStyle}
      ></img>
    </div>
  );
};

export default Image;
