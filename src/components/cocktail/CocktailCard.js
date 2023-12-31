import React, { useState, useEffect } from "react";
import withFavorites from "../hoc/WithFavorites";
import BasicModal from "../Layout/Modal/BasicModal";
import Image from "./Image";

import {
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Container,
  Grid,
} from "@mui/material";

import {
  Liquor as LiquorIcon,
  WineBarOutlined as WineBarOutlinedIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Ingredient } from "./Ingredient";

const Cocktail = ({ drink, toggleFavorite, isInFavorites }) => {
  const [isFavorited, setFavorited] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const shareLink = `https://twitter.com/intent/tweet?text=Check out this ${drink.name} cocktail recipe at ${window.location.origin}/cocktail/${drink.id}`;

  const handleCloseDetails = () => setDetailsOpen(false);
  const handleOpenDetails = () => setDetailsOpen(true);

  const handleAddToFavorites = () => {
    setFavorited(!isFavorited);
    toggleFavorite(drink.id);
  };

  useEffect(() => {
    setFavorited(isInFavorites(drink.id));
  }, [drink, isInFavorites]);

  return (
    <>
      {detailsOpen && (
        <BasicModal closeCallback={handleCloseDetails}>
          <CloseIcon
            style={{
              color: "gray",
              cursor: "pointer",
              position: "absolute",
              right: "10px",
              top: "10px",
            }}
            onClick={handleCloseDetails}
          ></CloseIcon>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item lg={6} align="center">
                <Typography variant="h4" sx={{ mb: 0.5 }}>
                  {drink.name}
                </Typography>

                <Container sx={{ mb: 1 }}>
                  <Image
                    style={{
                      width: "90%",
                      maxWidth: "400px",
                      borderRadius: "5%",
                      border: "1px solid #999",
                      backgroundColor: "rgba(217, 244, 255, 0.6)",
                      padding: "7px",
                      boxShadow: "4px 4px 7px #aaa",
                    }}
                    src={drink.image}
                    alt={drink.name}
                    minSkeletonHeight={350}
                  />
                </Container>

                <LiquorIcon
                  fontSize="small"
                  color={drink.alcoholic === "Alcoholic" ? "error" : "success"}
                />

                <Typography sx={{ ml: 0.5, mr: 2.5 }} variant="subtitle">
                  {drink.alcoholic}
                </Typography>

                <WineBarOutlinedIcon fontSize="small" />
                <Typography variant="subtitle">{drink.glassType}</Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={4} align="center">
                <Typography variant="h5" sx={{ mb: 0.5, mt: 1 }}>
                  Ingredients
                </Typography>
                <Divider sx={{ mb: 3 }} />
                {drink.ingredients.map((ingredient, index) => (
                  <Ingredient
                    key={index}
                    id={ingredient.id}
                    name={ingredient.name}
                    amount={ingredient.amount}
                  />
                ))}

                <Divider sx={{ mb: 2 }} />

                <Typography variant="h5" sx={{ mb: 1 }}>
                  <i>Instructions:</i>
                </Typography>
                <i>{drink.instructions}</i>
                <br />

                <Divider sx={{ m: 2 }} />

                <Typography
                  sx={{
                    p: 0.5,
                    pl: 1,
                    pr: 1,
                    border: 1,
                    borderRadius: 4,
                    borderColor: "primary.main",
                  }}
                  variant="h6"
                >
                  {drink.category}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </BasicModal>
      )}

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

            <Box
              align="center"
              onClick={handleOpenDetails}
              sx={{ cursor: "pointer" }}
            >
              <Image
                src={drink.image}
                alt={drink.name}
                style={{
                  width: "200px",
                  borderRadius: "5%",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                mt: 1,
              }}
            >
              <LiquorIcon
                fontSize="small"
                color={drink.alcoholic === "Alcoholic" ? "error" : "success"}
              />

              <Typography sx={{ ml: 0.5, mr: 2.5 }} variant="caption">
                {drink.alcoholic}
              </Typography>

              <WineBarOutlinedIcon fontSize="small" sx={{ ml: "auto" }} />
              <Typography variant="caption">{drink.glassType}</Typography>
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

            <IconButton
              style={{ cursor: "pointer" }}
              onClick={handleOpenDetails}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default withFavorites(Cocktail);
