import React from "react";
import {
  Paper,
  TableHead,
  Table,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
} from "@material-ui/core";
import ReadProductTableRow from "./ReadProductTableRow";

const ReadProduct = ({ productsData, deleteData, setDataToUpdate, addOneByOne }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Cantidad</TableCell>
            <TableCell align="center">Valor</TableCell>
            <TableCell align="center">Descripci&oacute;n</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsData.length === 0 ? (
            <TableRow>
              <TableCell>Sin datos</TableCell>
            </TableRow>
          ) : (
            productsData.map((row, index) => (
              <ReadProductTableRow
                key={index}
                rowData={row}
                addOneByOne={addOneByOne}
                deleteData={deleteData}
                setDataToUpdate={setDataToUpdate}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReadProduct;
