import React from "react";
import { TableRow, TableCell, Button } from "@material-ui/core";

const ReadProductTableRow = ({
  rowData,
  addOneByOne,
  deleteData,
  setDataToUpdate,
}) => {
  const { id, quantity, price, description } = rowData;

  return (
    <TableRow>
      <TableCell align="center">{id}</TableCell>
      <TableCell align="center">{quantity}</TableCell>
      <TableCell align="center">{price}</TableCell>
      <TableCell align="left">{description}</TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => addOneByOne(id)}
        >
          Agregar uno
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDataToUpdate(rowData)}
        >
          Actualizar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => deleteData(id)}
        >
          Eliminar
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ReadProductTableRow;
