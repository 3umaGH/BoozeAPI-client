import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
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
          sx={{ backgroundColor: "white" }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: "white" }} />
        </IconButton>
      </form>
    </Container>
  );
};

export default SearchBar;
