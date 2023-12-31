import {
  Collapse,
  Divider,
  IconButton,
  Typography,
  Zoom,
  Box,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { fetchIngredient } from "../../workers/CocktailService";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InfoIcon from "@mui/icons-material/Info";

import Image from "./Image";

export const Ingredient = ({ id, name, amount }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [ingredientData, setIngredientData] = useState();

  useEffect(() => {
    fetchIngredient(id).then((data) => {
      // Prepare ingredient data from API
      setIngredientData(data);
    });
  }, [id, name, amount]);

  return (
    <div>
      <Typography
        onClick={() => setIsHovered(!isHovered)}
        variant="subtitle2"
        sx={{ mb: 2, lineHeight: "1.3", cursor: "pointer" }}
      >
        <strong>{name}</strong> <InfoIcon fontSize="5px" color="disabled" />
        <br />
        {amount}
      </Typography>

      {isHovered && (
        <Zoom
          direction="up"
          timeout={700}
          in={isHovered}
          mountOnEnter
          unmountOnExit
        >
          {ingredientData && (
            <div>
              <Box sx={{ maxWidth: "120px" }}>
                <Image
                  src={ingredientData.image}
                  alt={ingredientData.name}
                  minSkeletonHeight={120}
                  style={{
                    width: "120px",
                  }}
                />
              </Box>
              <Typography variant="caption" sx={{}}>
                {ingredientData.name}
              </Typography>

              {ingredientData.type !== "None" && (
                <div>
                  <Divider width="150px" />
                  <Typography variant="caption">
                    <strong>{ingredientData.type}</strong>
                  </Typography>
                </div>
              )}
              <br />

              {ingredientData.description !== "None" && (
                <>
                  <Collapse in={isExpanded} collapsedSize={40}>
                    {ingredientData.description}
                  </Collapse>

                  <div>
                    <IconButton
                      onClick={() => setIsExpanded(!isExpanded)}
                      aria-label="Show more"
                      sx={{ mb: 2 }}
                    >
                      <KeyboardArrowDownIcon
                        sx={{
                          transform: `rotate(${isExpanded ? 180 : 0}deg)`,
                          transition: "transform 0.3s ease-in-out",
                        }}
                        fontSize="small"
                      />
                    </IconButton>
                  </div>
                </>
              )}
            </div>
          )}
        </Zoom>
      )}
    </div>
  );
};
