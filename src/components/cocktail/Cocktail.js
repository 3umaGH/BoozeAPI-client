import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";

import LiquorIcon from "@mui/icons-material/Liquor";
import WineBarOutlinedIcon from "@mui/icons-material/WineBarOutlined";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

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

const Cocktail = ({ getRandom, id }) => {
  const [cocktailData, setCocktailData] = useState(undefined);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const cocktailIngredients = [];

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const parseIngredients = (data) => {
    const ingredients = [];

    for (let i = 1; i <= 15; i++) {
      const ingredient = data.drinks[0][`strIngredient${i}`];
      if (ingredient != null) {
        ingredients.push(ingredient + " : " + data.drinks[0][`strMeasure${i}`])
      };
    }
    console.log("parsed ", ingredients.length);

    return ingredients;
  };

  useEffect(() => {
    fetchCocktail(getRandom, id).then((data) => {
      setCocktailData(data);
      setLoading(false);
    });
  }, [getRandom, id]);

  return (
    <Box sx={{ width: "300px", mt: 2, mr: 1 }}>
      <CardActionArea onClick={handleExpandClick}>
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
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          {!loading && (
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent align="center">
                <Typography variant="h6" paragraph>
                  Ingredients:
                </Typography>
                {parseIngredients(cocktailData).map((ingredient, index) => (
                  <Typography variant="body2" key={index} sx={{ mb: 2 }}>
                    <FiberManualRecordIcon
                      sx={{ fontSize: 10 }}
                      color="action"
                      fontSize="small"
                    />{" "}
                    {ingredient}
                  </Typography>
                ))}

                <Divider />
                  <Typography sx={{ mt: 2 }} variant="h6" paragraph>
                    Instructions:
                  </Typography>
                  <Typography variant="body2">
                    {cocktailData.drinks[0].strInstructions}
                  </Typography>
                  
              </CardContent>
            </Collapse>
          )}
        </Card>
      </CardActionArea>
    </Box>
  );
};

export default Cocktail;
