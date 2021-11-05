import React, { Fragment } from "react";
import Header from "../Components/Header";
import { makeStyles } from "@material-ui/core/styles";
import Factura from "./Factura";
import Historial from "./Historial";
//import Ajustes from "../Components/Ajustes"


const useStyles = makeStyles((theme) => ({
	dashBoard: {
		width: "calc(100% - 240px)",
		height: "calc(100vh - 80px)",
		marginLeft: 240,
		padding: "20px",
	},
}));

export default function Dashboard({ page, changePage }) {
	const classes = useStyles();

	return (
		<Fragment>
			<Header changePage={changePage} />
			<div className={classes.dashBoard}>
                {/* {page === "ajustes" && <Ajustes/>}  */}
                {page === "factura" && <Factura />}
				{page === "historial" && <Historial />}
				
			</div>
		</Fragment>
	);
}
