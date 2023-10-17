import { Typography, TableCell, TableRow } from "@mui/material";
import Image from "./Image";

const CocktailTableItem = ({ name, thumb, drinkId, onClick }) => {
  return (
    <TableRow onClick={onClick} hover={true}>
      <TableCell align="center">
          <Image
            src={`${thumb}/preview`}
            alt={"Cocktail"}
            style={{
              width: "130px",
              borderRadius: "10%",
            }}
          />
      </TableCell>

      <TableCell align="center">
          <Typography variant="h5" sx={{height:"100%"}}>{name}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default CocktailTableItem;
