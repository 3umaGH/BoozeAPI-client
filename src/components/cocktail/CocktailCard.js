import { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
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

import Image from "./Image";
import { parseIngredients } from "../../workers/CocktailService";

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

const Cocktail = ({ drink }) => {
  const [drinkData, setDrinkData] = useState(undefined);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setDrinkData(drink);
    setLoading(false);
  }, [drink]);

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
              {loading ? <Skeleton /> : drinkData.strDrink}
            </Typography>

            {loading ? (
              <Skeleton variant="rectangular" sx={{ height: "230px" }} />
            ) : (
              <Box align="center">
                <Image
                  src={drinkData.strDrinkThumb}
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
                  {drinkData.strAlcoholic === "Alcoholic" ? (
                    <LiquorIcon fontSize="small" color="error" />
                  ) : (
                    <LiquorIcon fontSize="small" color="success" />
                  )}

                  <Typography sx={{ ml: 0.5 }} variant="caption">
                    {drinkData.strAlcoholic}
                  </Typography>

                  <WineBarOutlinedIcon sx={{ ml: "auto" }} fontSize="small" />
                  <Typography variant="caption">
                    {drinkData.strGlass}
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
                {parseIngredients(drinkData).map((ingredient, index) => (
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
                  {drinkData.strInstructions}
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
