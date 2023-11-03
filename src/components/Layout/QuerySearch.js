import React, { useState, useEffect } from "react";
import {
  Container,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
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

  const [searchParams, setSearchParams] = useState({
    category: "",
    glassType: "",
    ingredients: [],
    alcoholic: "",
  });

  const isSearchParamsEmpty = () => {
    return (
      searchParams.category === "" &&
      searchParams.glassType === "" &&
      searchParams.ingredients.length === 0 &&
      searchParams.alcoholic === ""
    );
  };

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
    // Load URL search params when available parameters update.
    if (availableSearchParams.ingredients.length === 0) return;

    const params = new URLSearchParams(location.search);
    for (const key of Object.keys(searchParams)) {
      let paramValue = params.get(key);

      if (paramValue !== null && paramValue !== "") {
        if (key === "ingredients") {
          // We know that ingredients is an array, so need to split it.
          const array = paramValue.split(",");
          paramValue = array;
        }

        setSearchParams((prev) => {
          return { ...prev, [key]: paramValue };
        });
      }
    }
  }, [availableSearchParams]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams();

    for (const key of Object.keys(searchParams)) {
      let isArray = Array.isArray(searchParams[key]);
      let val = searchParams[key];

      if (val !== "")
        if (isArray) val.length > 0 && urlSearchParams.set(key, val);
        else urlSearchParams.set(key, val);
    }

    const newSearch = urlSearchParams.toString();
    window.history.pushState(null, "", newSearch ? `?${newSearch}` : "");

    if (!isSearchParamsEmpty()) {
      queryCallback(
        searchParams.category,
        searchParams.glassType,
        searchParams.ingredients,
        searchParams.alcoholic
      );
    }
  }, [searchParams]);

  return (
    <Container align="center">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={searchParams.category}
          onChange={(e) =>
            setSearchParams((prev) => {
              return { ...prev, category: e.target.value };
            })
          }
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
          value={searchParams.alcoholic}
          onChange={(e) =>
            setSearchParams((prev) => {
              return { ...prev, alcoholic: e.target.value };
            })
          }
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
          value={searchParams.glassType}
          onChange={(e) =>
            setSearchParams((prev) => {
              return { ...prev, glassType: e.target.value };
            })
          }
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
        {searchParams.ingredients.map((ingredient) => {
          return (
            <ListItem key={ingredient}>
              <Chip
                label={ingredient}
                onDelete={() =>
                  setSearchParams((prev) => {
                    const newArray = searchParams.ingredients.filter(
                      (item) => item !== ingredient
                    );
                    return { ...prev, ingredients: [...newArray] };
                  })
                }
              />
            </ListItem>
          );
        })}
      </Paper>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Autocomplete
          disablePortal
          options={availableSearchParams.ingredients}
          onChange={(e, value) => {
            setSearchParams((prev) => {
              const prevArray = searchParams.ingredients;

              if (value !== null && !searchParams.ingredients.includes(value))
                return { ...prev, ingredients: [...prevArray, value] };
            });
          }}
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
