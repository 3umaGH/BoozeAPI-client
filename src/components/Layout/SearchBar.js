import React, { useState } from "react";
import { Container, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ iconColor }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search?name=${searchQuery}`);
  };

  return (
    <Container>
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
        <IconButton type="submit" aria-label="search" sx={{ ml: -5 }}>
          <SearchIcon style={{ fill: `${iconColor}` }} />
        </IconButton>
      </form>
    </Container>
  );
};

export default SearchBar;
