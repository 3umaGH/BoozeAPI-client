import React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CocktailTableItem from "./CocktailTableItem";
import { CardActionArea, Container, Typography } from "@mui/material";

const CocktailTable = ({ fetchPromise, data }) => {
  const [cocktailData, setCocktailData] = useState();

  useEffect(() => {
    if (data !== undefined) setCocktailData(data);
    else {
      fetchPromise.then((data) => {
        setCocktailData(data);
      });
    }
  }, [fetchPromise, data]);

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="h6">Cocktails</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
            
          {cocktailData &&
            cocktailData.drinks.map((drink) => {
              return (
                <CardActionArea>
                <CocktailTableItem 
                  key={drink.idDrink}
                  name={drink.strDrink}
                  thumb={drink.strDrinkThumb}
                  drinkId={drink.idDrink}
                />
                </CardActionArea>
              );
            })}
        </TableBody>
      </Table>
    </Container>
  );
};

export default CocktailTable;
