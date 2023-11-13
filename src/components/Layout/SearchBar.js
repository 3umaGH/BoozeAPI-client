import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ iconColor }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (searchQuery.length > 3) { // API limits to at least 3 characters in order to search.
      navigate(`/?name=${searchQuery}`);
      window.location.reload();
    }
  };

  return (
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
  );
};

export default SearchBar;
