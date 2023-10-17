import { Typography, TableCell, TableRow } from "@mui/material";
import Image from "./Image";

const CocktailTableItem = ({ name, thumb, drinkId, onClick }) => {
  return (
    <TableRow onClick={onClick} sx={{ cursor: "pointer" }} hover={true}>
      <TableCell align="center">
        <Image
          src={`${thumb}/preview`}
          alt={"Cocktail"}
          style={{
            width: "20vw",
            maxWidth: "150px",
            borderRadius: "10%",
          }}
        />
      </TableCell>

      <TableCell align="center">
        <Typography variant="h6" >
          {name}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default CocktailTableItem;
