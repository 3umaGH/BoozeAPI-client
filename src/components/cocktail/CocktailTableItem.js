import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Image from "./Image";
import { Typography } from "@mui/material";

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
