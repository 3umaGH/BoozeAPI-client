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
  Divider,
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
    const updatedSearchParams = { ...searchParams };

    for (const key of Object.keys(searchParams)) {
      let paramValue = params.get(key);

      if (paramValue !== null && paramValue !== "") {
        if (key === "ingredients") {
          // We know that ingredients is an array, so need to split it.
          const array = paramValue.split(",");

          paramValue = array.length > 8 ? array.slice(0, 8) : array;
        }

        updatedSearchParams[key] = paramValue;
      }
    }

    setSearchParams((prev) => {
      return { ...updatedSearchParams };
    });
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
    <Container align="center" sx={{ mt: -2 }}>
      <Paper
        sx={{
          backgroundColor: "rgba(250, 250, 250,1)",
          mb: 2,
        }}
      >
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
        <br></br>

        <FormControl
          variant="standard"
          sx={{ m: 1, mb: 2, width: "50%", maxWidth: 400, minWidth: 170 }}
        >
          <Autocomplete
            disablePortal
            options={availableSearchParams.ingredients}
            disabled={searchParams.ingredients.length >= 8}
            onChange={(e, value) => {
              setSearchParams((prev) => {
                const prevArray = searchParams.ingredients;

                if (value !== null && !searchParams.ingredients.includes(value))
                  return { ...prev, ingredients: [...prevArray, value] };
                else return prev;
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Ingredients" />
            )}
          />
        </FormControl>

        <Divider width="40%" />

        <div
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            mb: 2,
          }}
        >
          {searchParams.ingredients.map((ingredient) => {
            return (
              <Chip
                label={ingredient}
                key={ingredient}
                sx={{ mx: 2, my: 2 }}
                onDelete={() =>
                  setSearchParams((prev) => {
                    const newArray = searchParams.ingredients.filter(
                      (item) => item !== ingredient
                    );
                    return { ...prev, ingredients: [...newArray] };
                  })
                }
              />
            );
          })}
        </div>
      </Paper>
    </Container>
  );
};

export default QuerySearch;
