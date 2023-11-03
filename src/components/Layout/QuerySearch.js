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
import { useLocation } from "react-router-dom";

const QuerySearch = ({ queryCallback }) => {
  const location = useLocation();

  const [availableSearchParams, setAvailableSearchParams] = useState({
    category: [],
    glassType: [],
    ingredients: [],
    alcoholic: [],
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGlassType, setSelectedGlassType] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState("");
  const [selectedIsAlcoholic, setSelectedIsAlcoholic] = useState("");

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

  const setQueryParamIfExists = (
    paramName,
    setter,
    availableParams,
    isArray
  ) => {
    const paramValue =
      new URLSearchParams(location.search).get(paramName) || "";

    if (isArray) {
      const array = paramValue.split(",").filter((entry) => {
        return availableParams[paramName].includes(entry);
      });

      setter(array);
    } else if (availableParams[paramName].includes(paramValue))
      setter(paramValue);
  };

  useEffect(() => {
    // Load URL search params when available parameters update.

    setQueryParamIfExists(
      "category",
      setSelectedCategory,
      availableSearchParams,
      false
    );

    setQueryParamIfExists(
      "glassType",
      setSelectedGlassType,
      availableSearchParams,
      false
    );

    setQueryParamIfExists(
      "ingredients",
      setSelectedIngredients,
      availableSearchParams,
      true
    );

    setQueryParamIfExists(
      "alcoholic",
      setSelectedIsAlcoholic,
      availableSearchParams,
      false
    );
  }, [availableSearchParams]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams();

    if (selectedCategory !== "")
      urlSearchParams.set("category", selectedCategory);

    if (selectedGlassType !== "")
      urlSearchParams.set("glassType", selectedGlassType);

    if (selectedIngredients !== "")
      urlSearchParams.set("ingredients", selectedIngredients);

    if (selectedIsAlcoholic !== "")
      urlSearchParams.set("alcoholic", selectedIsAlcoholic);

    const newSearch = urlSearchParams.toString();
    window.history.pushState(null, "", newSearch ? `?${newSearch}` : "");

    if (
      // Checking if at least one selected parameter is present.
      selectedCategory !== "" ||
      selectedGlassType !== "" ||
      selectedIngredients.length !== 0 ||
      selectedIsAlcoholic !== ""
    ) {
      queryCallback(
        selectedCategory,
        selectedGlassType,
        selectedIngredients,
        selectedIsAlcoholic
      );
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [
    selectedCategory,
    selectedGlassType,
    selectedIngredients,
    selectedIsAlcoholic,
  ]);

  const handleOptionSelected = (event, value) => {
    if (value !== null && !selectedIngredients.includes(value))
      setSelectedIngredients((prevData) => [...prevData, value]);
  };

  const handleIngredientDelete = (value) => {
    setSelectedIngredients((prevData) =>
      prevData.filter((item) => item !== value)
    );
  };

  return (
    <Container align="center">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
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
          value={selectedIsAlcoholic}
          onChange={(e) => {
            setSelectedIsAlcoholic(e.target.value);
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
          value={selectedGlassType}
          onChange={(e) => {
            setSelectedGlassType(e.target.value);
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
        {selectedIngredients &&
          selectedIngredients.map((data) => {
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
