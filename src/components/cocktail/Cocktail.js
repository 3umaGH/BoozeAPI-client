import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

import LiquorIcon from "@mui/icons-material/Liquor";
import WineBarOutlinedIcon from "@mui/icons-material/WineBarOutlined";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";

import { Box, Container } from "@mui/material";

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
    <Container sx={{ m: 2 }}>
      <Card sx={{ maxWidth: "300px" }}>
        <CardContent align="center">
          <Typography variant="h5" color="text.primary" gutterBottom>
            {loading ? <Skeleton /> : cocktailData.drinks[0].strDrink}
          </Typography>

          {loading ? (
            <Skeleton variant="rectangular" sx={{ maxWidth: "100%" }} />
          ) : (
            <Box>
              <img
                src={cocktailData.drinks[0].strDrinkThumb}
                alt="Cocktail"
                style={{ maxWidth: "100%", borderRadius: "5%" }}
              ></img>

              <Box sx={{ mt: 2 }}>
                {cocktailData.drinks[0].strAlcoholic === "Alcoholic" ? (
                  <LiquorIcon fontSize="small" color="error" />
                ) : (
                  <LiquorIcon fontSize="small" color="success" />
                )}

                <Typography variant="subtitle2">
                  {cocktailData.drinks[0].strAlcoholic}
                </Typography>
              </Box>

              <Box sx={{ mt: 1 }}>
                <WineBarOutlinedIcon fontSize="small" />
                <Typography variant="subtitle2">
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
          <ExpandMoreIcon aria-label="expand" sx={{ml:"auto"}} />
        </CardActions>
      </Card>
    </Container>
  );
};

export default Cocktail;
