import React, { Fragment } from "react";
import Header from "../Components/Header";
import { makeStyles } from "@material-ui/core/styles";
//import Facturas from "./Facturas";
//import Historial from "./Historial";
//import Ajustes from "../Components/Ajustes"
//import Usuario from "./Usuarios";


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
				{/* {page === "dashboard" && <DashboardPage />}
				{page === "leads" && <LeadsPage />}
				{page === "kpis" && <KPIsPage />}
				{page === "products" && <ProductsPage />}
				{page === "settings" && <SettingsPage />}
                {page === "Ajustes" && <Ajustes/>} 
                {page === "Facturas" && <Facturas />}
				{page === "Historial" && <Historial />}
				
				{page === "Usuario" && <Usuario />}*/
                }
				{/* {page === "dashboard" && <DashboardContent />} */}
				
			</div>
		</Fragment>
	);
}
