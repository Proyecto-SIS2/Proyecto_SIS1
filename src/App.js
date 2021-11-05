import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Factura from "./Pages/Factura"
import Historial from "./Pages/Historial"

export default function App() {
	const [page, setPage] = useState("dashboard");
	const handlePage = (page) => {
		setPage(page);
	};

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/tablero" render={() => <Dashboard page={page} changePage={handlePage} />} />
				<Route exact path="/registro" component={Register} />
				<Route exact path="/generador-de-factura" component={Factura} />
				<Route exact path="/historial-de-facturas" component={Historial} />

			</Switch>
		</BrowserRouter>
	);
}