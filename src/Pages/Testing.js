import React, { useState, useMemo, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Grid,
  Typography,
  InputBase,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Title from "../Components/Title";
import Text from "../Components/Text";
import { Button, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Service from "../Service";
import Swal from "sweetalert2";

const StyledTableCell = withStyles((theme) => ({
  root: {
    border: "none",
    outline: "none",
    boxSizing: "inherit",
    maxWidth: "1200px",
    margin: "0 auto",
    justifyContent: "center",
  },
  head: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    color: theme.palette.secondary.main,
    fontSize: "1.6rem",
    fontWeight: "bold",
  },
  body: {
    "&:first-child": {
      fontWeight: "bold",
    },
    fontSize: "1.6rem",
    color: theme.palette.text.light,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      transition: ".5s",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      transition: ".5s",
    },
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      transition: ".5s",
    },
    "&:hover th a": {
      color: theme.palette.secondary.main,
      transition: ".5s",
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
  },
  tableContainer: {
    backgroundColor: theme.palette.background.dark,
    margin: "auto",
  },
  tableGrid: {
    textAlign: "center",
    padding: "1rem",
  },

  inputContainer: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    borderRadius: ".5rem",
  },
  input: {
    fontSize: "1.6rem",
    color: theme.palette.text.light,
  },
  iconButton: {
    color: theme.palette.text.light,
    "&:hover": {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.secondary.main,
      transition: ".5s",
    },
  },
  icon: {
    fontSize: "1.8rem",
  },
  gridBtn: {
    fontSize: "1.6rem",
    textTransform: "capitalize",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.light,
    transition: ".5s",
    "&:hover": {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.secondary.main,
      transition: ".5s",
    },
  },
  check: {
    color: theme.palette.secondary.main,
  },
  selectEmpty: {
    color: theme.palette.secondary.main,
    fontSize: "1.6rem",
    fontWeight: 600,

    "&:before": {
      borderColor: theme.palette.secondary.main,
    },
    "&:after": {
      borderColor: theme.palette.secondary.main,
    },
    "&:not(.Mui-disabled):hover::before": {
      borderColor: theme.palette.secondary.main,
    },
  },
  iconSelect: {
    color: theme.palette.secondary.main,
  },
  selectOption: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.light,
    fontSize: "1.6rem",
    "&.MuiListItem-root.Mui-selected,.MuiListItem-root.Mui-selected:hover,.MuiListItem-button:hover":
      {
        backgroundColor: theme.palette.background.dark,
      },
    "&.MuiListItem-button:hover": {
      backgroundColor: theme.palette.background.dark,
    },
  },
  menulistTable: {
    backgroundColor: theme.palette.background.dark,
    boxShadow: "1px 1px 1px 1px rgba(0,0,0,14.6)",
  },
  menulistMore: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.dark,
    boxShadow: "1px 1px 1px 1px rgba(0,0,0,50.6)",
    padding: ".5rem",
  },
  iconMore: {
    fontSize: "3rem",
  },
  menuMoreUnselect: {
    backgroundColor: theme.palette.primary.main,
    margin: ".5rem",
    fontSize: "1.4rem",
    color: theme.palette.text.light,
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  checkTable: {
    color: theme.palette.text.light,
  },
  tableUserText: {
    color: theme.palette.text.light,
    fontSize: "1.6rem",
  },
  tableUserStatus: {
    color: theme.palette.text.light,
    fontSize: "1.6rem",
    border: "1px solid",
    borderRadius: "2rem",
  },
  editBtn: {
    fontSize: "2.2rem",
    color: theme.palette.primary.main,
  },
  leads: {
    borderColor: theme.palette.text.dark,
  },
  linkAnchor: {
    color: theme.palette.text.light,
    display: "block",
    height: "100%",
    textDecoration: "none",
    textAlign: "center",
  },
  leadsLink: {
    textDecoration: "none",
  },
  textProduct: {
    backgroundColor: "red",
  },
  field: {
    color: theme.palette.text.light,
    fontSize: "1.6rem",
    "& label": {
      color: theme.palette.text.light,
      fontSize: "1.6rem",
      opacity: 0.8,
    },
    "& fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "& fieldset legend": {
      fontSize: "1.15rem",
    },
    "&:hover fieldset": {
      borderWidth: `2px`,
    },
    "&:hover fieldset:not(.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline)":
      {
        borderColor: `${theme.palette.primary.main} !important`,
      },
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "column",
  },
  buttonProduct: {
    fontSize: "15px",
    border: "1px solid",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px 0",
  },
}));

const Toast = Swal.mixin({
  customClass: {
    title: "swal-title",
  },
  background: "#212936",
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

function useSearchProducts(products) {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(
    Object.values(products)
  );

  useMemo(() => {
    const result = Object.values(products).filter((product) => {
      if (query) {
        return `${product.descripcion}`
          .toLowerCase()
          .includes(query.toLowerCase());
      } else {
        return product;
      }
    });

    setFilteredProducts(result);
  }, [products, query]);

  return { query, setQuery, filteredProducts };
}

const Testing = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [blockSendButton, setBlockSendButton] = useState(true);
  const [entryState, setEntryState] = useState(false);

  const idu = localStorage.getItem("id");

  useEffect(() => {
    Service.postData("productos/get_productos", { id: idu }).then((res) => {
      setProducts(res);
    });
  }, [entryState]);

  useEffect(() => {
    if (description && quantity && price) {
      setBlockSendButton(false);
    } else {
      setBlockSendButton(true);
    }
  }, [description, quantity, price]);

  const { setQuery, filteredProducts } = useSearchProducts(products);

  const manejarEnvio = (e) => {
    e.preventDefault();
    setBlockSendButton(true);
    const params = {
      description: description,
      quantity: quantity,
      price: price,
      id: idu,
    };

    Service.postData("productos/register_producto", params).then((res) => {
      if (res.status === "correct") {
        setEntryState(true);
        setDescription("");
        setQuantity("");
        setPrice("");

        Toast.fire({
          icon: "success",
          title: "Registro de factura exitoso",
        });
      } else {
        setEntryState(false);
        Toast.fire({
          icon: "error",
          title: "Fallo en el registro",
        });
      }
    });
  };

  return (
    <main>
      <Title>Inventario de productos</Title>

      <TableContainer className={classes.tableContainer}>
        <Grid container className={classes.tableGrid}>
          <Grid
            item
            xs={6}
            style={{
              textAlign: "left",
            }}
          >
            <div className={classes.inputContainer}>
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon className={classes.icon} />
              </IconButton>
              <InputBase
                fullWidth={true}
                className={classes.input}
                placeholder="Buscar por descripción del producto"
                inputProps={{ "aria-label": "Buscar" }}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              textAlign: "end",
            }}
          ></Grid>
        </Grid>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">
                Descripción del producto
              </StyledTableCell>
              <StyledTableCell align="center">Cantidad</StyledTableCell>
              <StyledTableCell align="center">Precio</StyledTableCell>
              <StyledTableCell align="center">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length !== 0 &&
              filteredProducts.map((row, facturaIdx) => (
                <StyledTableRow key={facturaIdx}>
                  <StyledTableCell align="center" component="th" scope="row">
                    <Typography className={classes.tableUserText} variant="h5">
                      {row.id_producto}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell align="center" component="th" scope="row">
                    <Typography className={classes.tableUserText} variant="h5">
                      {row.descripcion}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell align="center" component="th" scope="row">
                    <Typography className={classes.tableUserText} variant="h5">
                      {row.cantidad}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell align="center" component="th" scope="row">
                    <Typography className={classes.tableUserText} variant="h5">
                      {row.precio}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    <Button>Modificar producto</Button>
                    <Button>Eliminar producto</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        {filteredProducts.length === 0 && (
          <Typography
            style={{ padding: "1rem", textAlign: "center" }}
            className={classes.tableUserText}
            variant="h5"
          >
            No se encontraron resultados en tu búsqueda.
          </Typography>
        )}
      </TableContainer>
      <Text id={classes.textProduct}>Agregar producto</Text>
      <Grid container className={classes.root}>
        <div className={classes.fieldContainer}>
          <div className={classes.textFieldContainer}>
            <TextField
              className={classes.field}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="descripcion"
              label="Descripción del producto"
              id="descripcion"
              InputProps={{
                className: classes.inputField,
              }}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <TextField
              className={classes.field}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="cantidad"
              label="Cantidad"
              id="cantidad"
              InputProps={{
                className: classes.inputField,
              }}
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            />
            <TextField
              className={classes.field}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="precio"
              label="Precio"
              id="precio"
              InputProps={{
                className: classes.inputField,
              }}
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.buttonProduct}
            onClick={manejarEnvio}
            disabled={blockSendButton}
          >
            Registrar producto
          </Button>
        </div>
      </Grid>
    </main>
  );
};

export default Testing;
