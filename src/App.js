import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Factura from "./Components/Factura";
import Historial from "./Pages/Historial";
import FacturaID from "./Pages/FacturaID";
import Inventario from "./Pages/Inventario";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const handlePage = (page) => {
    setPage(page);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route
          exact
          path="/tablero"
          render={() => <Dashboard page={page} changePage={handlePage} />}
        />
        <Route exact path="/registro" component={Register} />
        <Route
          exact
          path="/generador-de-factura"
          render={() => <Factura page={page} changePage={handlePage} />}
        />
        <Route
          exact
          path="/historial-de-facturas"
          render={() => <Historial page={page} changePage={handlePage} />}
        />
        <Route
          exact
          path="/factura-generada/"
          render={() => <FacturaID page={page} changePage={handlePage} />}
        />
        <Route
          exact
          path="/inventario/"
          render={() => <Inventario page={page} changePage={handlePage} />}
        />
      </Switch>
    </BrowserRouter>
  );
}
