import React, { useState } from "react";
import { Container, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search?name=${searchQuery}`);
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <form onSubmit={submitHandler}>
        <TextField
          id="search-bar"
          className="text"
          onInput={(e) => setSearchQuery(e.target.value)}
          required
          placeholder="Search cocktails"
          variant="outlined"
          size="small"
          sx={{ borderRadius: "5px", backgroundColor: "white" }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: "white" }} />
        </IconButton>
      </form>
    </Container>
  );
};

export default SearchBar;
