import { Typography, TableCell, TableRow } from "@mui/material";
import Image from "./Image";

const CocktailTableItem = ({ name, thumb, drinkId }) => {
  return (
    <TableRow>
      <TableCell align="center">
        <Image
          src={`${thumb}/preview`}
          alt={"Cocktail"}
          style={{
            width: "100px",
            borderRadius: "10%",
          }}
        />
      </TableCell>

      <TableCell align="center">
        <Typography variant="h5">{name}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default CocktailTableItem;
