import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CocktailTableItem from "./CocktailTableItem";
import CocktailCard from "./CocktailCard";
import Modal from "../Layout/Modal/Modal";
import Backdrop from "../Layout/Modal/Backdrop";

import { fetchCocktail } from "../../workers/CocktailService";

import uuid from 'react-uuid';

const CocktailTable = ({ fetchPromise, data }) => {
  const [cocktailData, setCocktailData] = useState();
  const [viewingCocktail, setViewingCocktail] = useState();

  const closeModal = () => {
    setViewingCocktail(null);
  };

  useEffect(() => {
    if (data !== undefined) setCocktailData(data);
    else {
      fetchPromise.then((data) => {
        setCocktailData(data);
      });
    }
  }, [fetchPromise, data]);

  const handleRowClick = (e, drinkId) => {
    fetchCocktail(false, drinkId).then((data) =>
      setViewingCocktail(data.drinks[0])
    );
  };

  return (
    <Container align="center">
      {viewingCocktail && (
        <Modal closeCallback={closeModal}>
          <CocktailCard
            key={viewingCocktail.idDrink}
            drink={viewingCocktail}
            isExpanded={true}
          ></CocktailCard>
        </Modal>
      )}

      {viewingCocktail && <Backdrop onClick={closeModal} />}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cocktailData &&
            cocktailData.drinks.map((drink) => {
              return (
                <CocktailTableItem
                  key={uuid()}
                  name={drink.strDrink}
                  thumb={drink.strDrinkThumb}
                  drinkId={drink.idDrink}
                  onClick={(e) => handleRowClick(e, drink.idDrink)}
                />
              );
            })}
        </TableBody>
      </Table>
    </Container>
  );
};

export default CocktailTable;
