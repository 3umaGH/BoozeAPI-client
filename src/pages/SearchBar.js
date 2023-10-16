import { Container, InputLabel } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

import { fetchSearchParameters } from "../workers/CocktailService";
import { useEffect, useState } from "react";

const SearchBar = ({ queryCallback }) => {
  const [availableSearchParams, setAvailableSearchParams] = useState({
    category: [],
    glassType: [],
    ingredients: [],
    alcoholic: [],
  });

  const [categoryQuery, setCategoryQuery] = useState("");
  const [glassTypeQuery, setGlassTypeQuery] = useState("");
  const [ingredientsQuery, setIngredientsQuery] = useState("");
  const [alcoholicQuery, setAlcoholicQuery] = useState("");

  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchSearchParameters().then((data) => {
      const categories = new Set(),
        glassType = new Set(),
        ingredients = new Set(),
        alcoholic = new Set();

      data.forEach((item) => {
        item.drinks.forEach((drink) => {
          if (drink.strCategory) categories.add(drink.strCategory);
          if (drink.strGlass) glassType.add(drink.strGlass);
          if (drink.strIngredient1) ingredients.add(drink.strIngredient1);
          if (drink.strAlcoholic) alcoholic.add(drink.strAlcoholic);
        });
      });

      setAvailableSearchParams((prevState) => ({
        ...prevState,
        category: Array.from(categories),
        glassType: Array.from(glassType),
        ingredients: Array.from(ingredients),
        alcoholic: Array.from(alcoholic),
      }));

      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (
      categoryQuery !== "" ||
      glassTypeQuery !== "" ||
      ingredientsQuery !== "" ||
      alcoholicQuery !== ""
    ) {
      queryCallback(
        categoryQuery,
        glassTypeQuery,
        ingredientsQuery,
        alcoholicQuery
      );
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [categoryQuery, glassTypeQuery, ingredientsQuery, alcoholicQuery]);

  return (
    <Container align="center">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={categoryQuery}
          onChange={(e) => setCategoryQuery(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {isLoaded &&
            availableSearchParams.category.map((category, index) => (
              <MenuItem value={category} key={index}>
                {category}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Alcoholic</InputLabel>
        <Select
          label="Alcoholic"
          value={alcoholicQuery}
          onChange={(e) => setAlcoholicQuery(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {isLoaded &&
            availableSearchParams.alcoholic.map((category, index) => (
              <MenuItem value={category} key={index}>
                {category}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Glass Type</InputLabel>
        <Select
          label="Glass Type"
          value={glassTypeQuery}
          onChange={(e) => setGlassTypeQuery(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {isLoaded &&
            availableSearchParams.glassType.map((category, index) => (
              <MenuItem value={category} key={index}>
                {category}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Container>
  );
};

export default SearchBar;
