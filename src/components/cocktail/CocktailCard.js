import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  IconButton,
} from "@mui/material";

import {
  Liquor as LiquorIcon,
  WineBarOutlined as WineBarOutlinedIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
  FiberManualRecord as FiberManualRecordIcon,
} from "@mui/icons-material";

import Image from "./Image";
import { parseIngredients } from "../../workers/CocktailService";
import withFavorites from "../hoc/WithFavorites";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Cocktail = ({ drink, isExpanded, toggleFavorite, isInFavorites }) => {
  const [expanded, setExpanded] = useState(false);
  const [isFavorited, setFavorited] = useState(false); // Used to re-render for the icon to update

  const shareLink = `https://twitter.com/intent/tweet?text=Check out this ${drink.name} cocktail recipe at ${window.location.origin}/cocktail/${drink.id}`;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToFavorites = () => {
    setFavorited(!isFavorited);
    toggleFavorite(drink.id);
  };

  useEffect(() => {
    setExpanded(isExpanded);
    setFavorited(isInFavorites(drink.id));
  }, [drink, isExpanded, isInFavorites]);

  const drinkThumb = (
    <>
      <Box
        align="center"
        onClick={handleExpandClick}
        sx={{ cursor: "pointer" }}
      >
        <Image
          src={drink.image}
          alt={"Cocktail"}
          style={{
            width: "200px",
            borderRadius: "5%",
          }}
        />
      </Box>
    </>
  );

  const drinkIsAlcoholicElement = (
    <>
      {drink.alcoholic === "Alcoholic" ? (
        <LiquorIcon fontSize="small" color="error" />
      ) : (
        <LiquorIcon fontSize="small" color="success" />
      )}

      <Typography sx={{ ml: 0.5 }} variant="caption">
        {drink.alcoholic}
      </Typography>
    </>
  );

  const drinkGlassType = (
    <>
      <WineBarOutlinedIcon sx={{ ml: "auto" }} fontSize="small" />
      <Typography variant="caption">{drink.glassType}</Typography>
    </>
  );

  return (
    <Box sx={{ width: "300px", mt: 2, mr: 1 }}>
      <Card sx={{}}>
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            whiteSpace="nowrap"
            color="text.primary"
            textOverflow="ellepsis"
            overflow="hidden"
            gutterBottom
          >
            {drink.name}
          </Typography>

          {drinkThumb}

          <Box
            sx={{
              display: "flex",
              mt: 1,
            }}
          >
            {drinkIsAlcoholicElement}
            {drinkGlassType}
          </Box>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            color={isFavorited ? "error" : ""}
            onClick={() => handleAddToFavorites()}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton
            aria-label="share"
            href={shareLink}
            target="_blank"
            rel="noreferrer noopener"
          >
            <ShareIcon />
          </IconButton>

          <Typography
            sx={{
              m: "auto",
              p: 0.5,
              pl: 1,
              pr: 1,
              border: 1,
              borderRadius: 4,
              borderColor: "primary.main",
            }}
            variant="caption"
          >
            {drink.category}
          </Typography>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent align="center">
            <Typography variant="h6" paragraph>
              Ingredients:
            </Typography>
            {drink.ingredients.map((ingredient, index) => (
              <Typography variant="body2" key={index} sx={{ mb: 2 }}>
                <FiberManualRecordIcon
                  sx={{ fontSize: 10 }}
                  color="action"
                  fontSize="small"
                />{" "}
                {ingredient.amount} - {ingredient.name}
              </Typography>
            ))}

            <Divider />
            <Typography sx={{ mt: 2 }} variant="h6" paragraph>
              Instructions:
            </Typography>
            <Typography variant="body2">{drink.instructions}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default withFavorites(Cocktail);
