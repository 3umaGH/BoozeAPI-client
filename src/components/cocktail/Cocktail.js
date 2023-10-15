import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import LiquorIcon from "@mui/icons-material/Liquor";
import WineBarOutlinedIcon from "@mui/icons-material/WineBarOutlined";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";

import { Box } from "@mui/material";
import Image from "./Image";

const RANDOM_LINK = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const SPECIFIC_ID = "www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const fetchCocktail = async (useRandom, id) => {
  const link = useRandom ? RANDOM_LINK : SPECIFIC_ID + id;

  const response = await fetch(link);

  if (response.status !== 200)
    throw new Error("Unable to fetch cocktail. Status: " + response.status);

  const data = await response.json();

  return data;
};

const Cocktail = ({ getRandom, id }) => {
  const [cocktailData, setCocktailData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCocktail(getRandom, id).then((data) => {
      setCocktailData(data);
      setLoading(false);
    });
  }, [getRandom, id]);

  return (
    <Box sx={{ width: "300px", mt: 2, mr: 1 }}>
      <CardActionArea>
        <Card sx={{ height: "380px" }}>
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
              {loading ? <Skeleton /> : cocktailData.drinks[0].strDrink}
            </Typography>

            {loading ? (
              <Skeleton variant="rectangular" sx={{ height: "230px" }} />
            ) : (
              <Box align="center">
                <Image
                  src={cocktailData.drinks[0].strDrinkThumb}
                  alt={"Cocktail"}
                  style={{
                    width: "200px",
                    borderRadius: "5%",
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    mt: 1,
                  }}
                >
                  {cocktailData.drinks[0].strAlcoholic === "Alcoholic" ? (
                    <LiquorIcon fontSize="small" color="error" />
                  ) : (
                    <LiquorIcon fontSize="small" color="success" />
                  )}

                  <Typography sx={{ ml: 0.5 }} variant="caption">
                    {cocktailData.drinks[0].strAlcoholic}
                  </Typography>

                  <WineBarOutlinedIcon sx={{ ml: "auto" }} fontSize="small" />
                  <Typography variant="caption">
                    {cocktailData.drinks[0].strGlass}
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMoreIcon aria-label="expand" sx={{ ml: "auto" }} />
          </CardActions>
        </Card>
      </CardActionArea>
    </Box>
  );
};

export default Cocktail;
