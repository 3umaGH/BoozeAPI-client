import React, { useState, useEffect } from "react";
import {
  Container,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Typography,
  Autocomplete,
  TextField,
  Chip,
  Paper,
  ListItem,
} from "@mui/material";

import { fetchSearchParameters } from "../../workers/CocktailService";
import DeleteIcon from "@mui/icons-material/Delete";

const QuerySearch = ({ queryCallback }) => {
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
      setAvailableSearchParams((prevState) => ({
        ...prevState,
        category: Array.from(data.categories),
        glassType: Array.from(data.glassTypes),
        ingredients: Array.from(data.ingredients),
        alcoholic: Array.from(data.alcoholic),
      }));
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (
      categoryQuery !== "" ||
      glassTypeQuery !== "" ||
      ingredientsQuery.length !== 0 ||
      alcoholicQuery !== ""
    ) {
      console.log(ingredientsQuery.length);
      queryCallback(
        categoryQuery,
        glassTypeQuery,
        ingredientsQuery,
        alcoholicQuery
      );
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [categoryQuery, glassTypeQuery, ingredientsQuery, alcoholicQuery]);

  const handleOptionSelected = (event, value) => {
    if (value !== null && !ingredientsQuery.includes(value))
      setIngredientsQuery((prevData) => [...prevData, value]);
  };

  const handleIngredientDelete = (value) => {
    setIngredientsQuery((prevData) =>
      prevData.filter((item) => item !== value)
    );
  };

  return (
    <Container align="center">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={categoryQuery}
          onChange={(e) => {
            setCategoryQuery(e.target.value);
          }}
        >
          <MenuItem value="">
            <em>{isLoaded ? "None" : "Loading..."}</em>
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
          onChange={(e) => {
            setAlcoholicQuery(e.target.value);
          }}
        >
          <MenuItem value="">
            <em>{isLoaded ? "None" : "Loading..."}</em>
          </MenuItem>

          {isLoaded &&
            availableSearchParams.alcoholic.map((category, index) => (
              <MenuItem value={category} key={index}>
                {category}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, mb: 3, minWidth: 120 }}>
        <InputLabel>Glass Type</InputLabel>
        <Select
          label="Glass Type"
          value={glassTypeQuery}
          onChange={(e) => {
            setGlassTypeQuery(e.target.value);
          }}
        >
          <MenuItem value="">
            <em>{isLoaded ? "None" : "Loading..."}</em>
          </MenuItem>

          {isLoaded &&
            availableSearchParams.glassType.map((category, index) => (
              <MenuItem value={category} key={index}>
                {category}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <Paper
        sx={{
          display: "flex",
          justifyItems: "center",
          justifyContent: "center",
        }}
        component="ul"
      >
        {ingredientsQuery &&
          ingredientsQuery.map((data) => {
            return (
              <ListItem key={data}>
                <Chip
                  label={data}
                  onDelete={() => handleIngredientDelete(data)}
                />
              </ListItem>
            );
          })}
      </Paper>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Autocomplete
          disablePortal
          options={availableSearchParams.ingredients}
          onChange={handleOptionSelected}
          sx={{ width: 300, height: 100 }}
          renderInput={(params) => (
            <TextField {...params} label="Ingredients" />
          )}
        />
      </FormControl>
    </Container>
  );
};

export default QuerySearch;
