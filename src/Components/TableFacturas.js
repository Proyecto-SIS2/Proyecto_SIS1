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
import { Link } from "react-router-dom";

import Title from "./Title";
import Text from "./Text";
import SearchIcon from "@material-ui/icons/Search";
import Service from "../Service";


const StyledTableCell = withStyles((theme) => ({
  root: {
    border: "none",
    outline: "none",
    boxSizing: "inherit",
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
      // backgroundColor: theme.palette.background.dark,
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
  table: {
    // border: `2px solid ${theme.palette.background.dark}`,
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
  /* menuMoreDelete: {
    backgroundColor: theme.palette.boolean.false,
    margin: ".5rem",
    fontSize: "1.4rem",
    color: theme.palette.text.light,
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: theme.palette.boolean.false,
    },
  }, */
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
  /* removeBtn: {
    fontSize: "2.2rem",
    color: theme.palette.boolean.false,
  }, */
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
}));

function useSearchInvoices(invoices) {
	const [query, setQuery] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState(Object.values(invoices));
		
	useMemo(() => {			
			const result = Object.values(invoices).filter((invoice) => {
      if(query){
        return `${invoice.RFC_Rec} ${invoice.fecha}`.toLowerCase().includes(query.toLowerCase())
      }
      else{
        return invoice;
      }
		});

    setFilteredInvoices(result);
	}, [invoices, query]);

	return { query, setQuery, filteredInvoices};
}

export default function TableFacturas() {
  const classes = useStyles();

  const [invoices, setInvoices] = React.useState([]);

  const idu=localStorage.getItem("id");

  useEffect(() => {
				Service.postData("facturas/get_facturas", {id:idu}).then((res) =>{
					setInvoices(res);
				})
	}, [idu]);

  const { setQuery, filteredInvoices} = useSearchInvoices(invoices);

  const assignID = (e) =>{
    localStorage.setItem('id_factura', e);
  }

  return (
    <div>
      <Title>Facturas</Title>
      <Text>Haga click en el ID para generar la factura</Text>
      
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
                placeholder="Buscar por RFC Receptor o Fecha"
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
          >
          </Grid>
        </Grid>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>  
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">RFC Expedido</StyledTableCell>
              <StyledTableCell align="center">RFC Receptor</StyledTableCell>
              <StyledTableCell align="center">Régimen</StyledTableCell>
              <StyledTableCell align="center">Impuestos</StyledTableCell>
              <StyledTableCell align="center">Condición de pago</StyledTableCell>
              <StyledTableCell align="center">Método de pago</StyledTableCell>
              <StyledTableCell align="center">Fecha</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredInvoices.length !== 0 &&
							filteredInvoices.map((row) => (
                <StyledTableRow key={row.id_factura}>
                  <StyledTableCell align="center" component="th" scope="row">
                    <Link
                      to={`/factura-generada/`}
                      className={classes.linkAnchor}   
                      onClick={() => { assignID(row.id_factura) }}     
                    >                     
                      {row.id_factura}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    <Typography className={classes.tableUserText} variant="h5">
                      {row.RFC_Exp}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    <Typography className={classes.tableUserText} variant="h5">
                      {row.RFC_Rec}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    <Typography className={classes.tableUserText} variant="h5">
                      {row.regimen}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    <Typography className={classes.tableUserText} variant="h5">
                      {row.impuestos}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    <Typography className={classes.tableUserText} variant="h5">
                      {row.cond_pago}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    <Typography className={classes.tableUserText} variant="h5">
                      {row.metodo_pago}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    <Typography className={classes.tableUserText} variant="h5">
                      {row.fecha}
                    </Typography>
                  </StyledTableCell>   
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        {filteredInvoices.length === 0 && (
					<Typography
						style={{ padding: "1rem", textAlign: "center" }}
						className={classes.tableUserText}
						variant="h5"
					>
						No se encontraron resultados en tu búsqueda.
					</Typography>
				)}
      </TableContainer>
    </div>
  );
}
