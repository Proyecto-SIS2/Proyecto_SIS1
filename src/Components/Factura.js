import React, { useState, useEffect } from "react";
import { Button, TextField, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import Select from "react-select";
import Text from "./Text";

import Service from "../Service";
import logo from "../Images/logo.png";
import PaymentsIcon from "@material-ui/icons/Payment";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import BookIcon from "@material-ui/icons/Book";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import BusinessIcon from "@material-ui/icons/Business";
import RoomIcon from "@material-ui/icons/Room";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import MailIcon from "@material-ui/icons/Mail";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import PersonIcon from "@material-ui/icons/Person";
import Mail from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    padding: 20,
    height: "650px",
  },
  logoImg: {
    width: "75%",
    display: "block",
    margin: "0 auto",
    padding: "20px 0",
  },
  form: {
    width: "100%",
  },
  textFieldContainer: {
    display: "flex",
    alignItems: "center",

    "& > label": {
      margin: "10px 10px 0 0",
    },
  },
  loginContainer: {
    backgroundColor: theme.palette.background.default,
    boxShadow: "none",
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
  fieldSelect: {
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
    margin: "10px 10px 0 0",
    width: "213px",
  },
  fieldIcon: {
    color: theme.palette.text.light,
    fontSize: "4rem",
  },
  inputField: {
    color: theme.palette.text.light,
    fontSize: "1.6rem",
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    textTransform: "capitalize",
    fontWeight: "600",
    color: theme.palette.text.light,
    fontSize: "2rem",
  },
  textLink: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    fontSize: "1.6rem",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  alertText: {
    color: "red",
    fontSize: "1.6rem",
    position: "relative",
    marginInlineStart: "50px",
    display: "none",
  },
}));

const Toast = Swal.mixin({
  customClass: {
    title: "swal-title",
  },
  background: "#212936",
  toast: true,
  position: "middle",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

const regimen_options = [
  { value: 1, label: "Régimen de asalariados" },
  {
    value: 2,
    label: "Régimen de actividades profesionales",
  },
  {
    value: 3,
    label: "Régimen de arrendamiento de inmuebles",
  },
  { value: 4, label: "Régimen de actividad empresarial" },
  { value: 5, label: "Régimen de incorporación fiscal" },
];

const cond_pago_options = [
  { value: 1, label: "Pago anticipado" },
  { value: 2, label: "Pago al contado" },
  { value: 3, label: "Pago aplazado" },
];

const metodo_pago_options = [
  { value: 1, label: "Pago en efectivo" },
  { value: 2, label: "Cheque" },
  { value: 3, label: "Transferencia bancaria" },
];

export default function Factura({ file }) {
  //Estados de la empresa
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [direccionEmpresa, setDireccionEmpresa] = useState("");
  const [ciudadEstadoEmpresa, setCiudadEstadoEmpresa] = useState("");
  const [codigoPostalEmpresa, setCodigoPostalEmpresa] = useState("");
  const [telefonoEmpresa, setTelefonoEmpresa] = useState("");
  const [nombreFacturador, setNombreFacturador] = useState("");
  const [rfc_exp, setRFC_Exp] = useState("");

  //Estados del cliente
  const [nombreCliente, setNombreCliente] = useState("");
  const [direccionCliente, setDireccionCliente] = useState("");
  const [ciudadEstadoCliente, setCiudadEstadoCliente] = useState("");
  const [codigoPostalCliente, setCodigoPostalCliente] = useState("");
  const [rfc_rec, setRFC_Rec] = useState("");
  const [regimen, setRegimen] = useState();
  const [cond_pago, setCond_pago] = useState("");
  const [metodo_pago, setMetodo_pago] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [valor, setValor] = useState("");

  const idu = localStorage.getItem("id");

  const [blockSendButton, setBlockSendButton] = useState(true);
  const [entryState, setEntryState] = useState(false);

  useEffect(() => {
    if (
      nombreFacturador &&
      nombreEmpresa &&
      direccionEmpresa &&
      ciudadEstadoEmpresa &&
      codigoPostalEmpresa &&
      telefonoEmpresa &&
      rfc_exp &&
      nombreCliente &&
      direccionCliente &&
      ciudadEstadoCliente &&
      codigoPostalCliente &&
      rfc_rec &&
      regimen &&
      cond_pago &&
      metodo_pago &&
      descripcion &&
      cantidad &&
      valor
    ) {
      setBlockSendButton(false);
    }
    if (telefonoEmpresa.length >= 10) {
      setTelefonoEmpresa(telefonoEmpresa.slice(0, 10));
    }
    if (codigoPostalEmpresa.length >= 5) {
      setCodigoPostalEmpresa(codigoPostalEmpresa.slice(0, 5));
    }
    if (codigoPostalCliente.length >= 5) {
      setCodigoPostalCliente(codigoPostalCliente.slice(0, 5));
    }
    if (rfc_exp.length >= 13) {
      setRFC_Exp(rfc_exp.slice(0, 13));
    }
    if (rfc_rec.length >= 13) {
      setRFC_Rec(rfc_rec.slice(0, 13));
    }
  }, [
    nombreFacturador,
    nombreEmpresa,
    direccionEmpresa,
    ciudadEstadoEmpresa,
    codigoPostalEmpresa,
    telefonoEmpresa,
    nombreCliente,
    direccionCliente,
    ciudadEstadoCliente,
    codigoPostalCliente,
    rfc_exp,
    rfc_rec,
    regimen,
    cond_pago,
    metodo_pago,
    descripcion,
    cantidad,
    valor,
  ]);

  useEffect(() => {
    if (!file) return;
    const fileData = file.split(",");
    setNombreEmpresa(fileData[0]);
    setDireccionEmpresa(fileData[1]);
    setCiudadEstadoEmpresa(fileData[2]);
    setCodigoPostalEmpresa(fileData[3]);
    setTelefonoEmpresa(fileData[4]);
    setNombreFacturador(fileData[5]);
    setRFC_Exp(fileData[6]);
    setNombreCliente(fileData[7]);
    setDireccionCliente(fileData[8]);
    setCiudadEstadoCliente(fileData[9]);
    setCodigoPostalCliente(fileData[10]);
    setRFC_Rec(fileData[11]);
    setRegimen(fileData[12]);
    setDescripcion(fileData[13]);
    setCantidad(fileData[14]);
    setValor(fileData[15]);
    setCond_pago(fileData[16]);
    setMetodo_pago(fileData[17]);
  }, [file]);

  const manejarEnvio = (e) => {
    setBlockSendButton(true);
    const params = {
      rfc_exp: rfc_exp,
      rfc_rec: rfc_rec,
      regimen: parseInt(regimen),
      impuestos: 16,
      cond_pago: parseInt(cond_pago),
      metodo_pago: parseInt(metodo_pago),
      id: idu,
      descripcion: descripcion,
      cantidad: cantidad,
      valor: valor,
      nombreEmpresa: nombreEmpresa,
      direccionEmpresa: direccionEmpresa,
      ciudadEstadoEmpresa: ciudadEstadoEmpresa,
      codigoPostalEmpresa: codigoPostalEmpresa,
      telefonoEmpresa: telefonoEmpresa,
      nombreCliente: nombreCliente,
      direccionCliente: direccionCliente,
      ciudadEstadoCliente: ciudadEstadoCliente,
      codigoPostalCliente: codigoPostalCliente,
      nombreFacturador: nombreFacturador,
    };
    console.log(params);
    Service.postData("facturas/register_factura", params).then((res) => {
      if (res.status === "correct") {
        setEntryState(true);
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

  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      {entryState ? window.location.reload() : null}
      <img src={logo} alt="Logo" className={classes.logoImg} />
      <Grid
        item
        xs={12}
        sm={4}
        component={Paper}
        elevation={6}
        square
        className={classes.loginContainer}
      >
        <div className={classes.paper}>
          <Text>Datos de la empresa</Text>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="company_name">
                <BusinessIcon className={classes.fieldIcon} />
              </label>
              <TextField
                className={`${classes.field} field`}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={nombreEmpresa}
                name="Nombre de la empresa"
                label="Nombre de la empresa"
                id="company_name"
                InputProps={{
                  className: classes.inputField,
                }}
                onChange={(e) => setNombreEmpresa(e.target.value)}
              />
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="street_address">
                <RoomIcon className={classes.fieldIcon} />
              </label>
              <TextField
                className={classes.field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Direción"
                label="Dirección"
                id="street_name"
                value={direccionEmpresa}
                InputProps={{
                  className: classes.inputField,
                }}
                onChange={(e) => setDireccionEmpresa(e.target.value)}
              />
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="city_state">
                <LocationCityIcon className={classes.fieldIcon} />
              </label>
              <TextField
                className={classes.field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Ciudad, Estado"
                label="Ciudad, Estado"
                id="city_state"
                InputProps={{
                  className: classes.inputField,
                }}
                onChange={(e) => setCiudadEstadoEmpresa(e.target.value)}
                value={ciudadEstadoEmpresa}
              />
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="zip">
                <MailIcon className={classes.fieldIcon} />
              </label>
              <TextField
                className={classes.field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Código Postal"
                label="Código Postal"
                id="zip"
                InputProps={{
                  className: classes.inputField,
                }}
                onChange={(e) => setCodigoPostalEmpresa(e.target.value)}
                value={codigoPostalEmpresa}
              />
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="phone_number">
                <LocalPhoneIcon className={classes.fieldIcon} />
              </label>
              <TextField
                className={classes.field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Número telefónico"
                label="Número telefónico"
                id="phone_number"
                InputProps={{
                  className: classes.inputField,
                }}
                onChange={(e) => setTelefonoEmpresa(e.target.value)}
                value={telefonoEmpresa}
              />
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="name_invoicer">
                <PersonIcon className={classes.fieldIcon} />
              </label>
              <TextField
                className={classes.field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Nombre del facturador"
                label="Nombre del facturador"
                id="name_invoicer"
                InputProps={{
                  className: classes.inputField,
                }}
                onChange={(e) => setNombreFacturador(e.target.value)}
                value={nombreFacturador}
              />
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="rfc_exp">
                <ContactMailIcon className={classes.fieldIcon} />
              </label>
              <TextField
                className={classes.field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="RFC Expedido"
                label="RFC Expedido"
                id="rfc_exp"
                InputProps={{
                  className: classes.inputField,
                }}
                onChange={(e) => setRFC_Exp(e.target.value)}
                value={rfc_exp}
              />
            </div>
          </div>
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        component={Paper}
        elevation={4}
        square
        className={classes.loginContainer}
      >
        <div className={classes.paper}>
          <Text>Datos del cliente</Text>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="name_client">
                <PersonIcon className={classes.fieldIcon} />
              </label>
              <TextField
                className={classes.field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Nombre del cliente"
                label="Nombre del cliente"
                id="name_client"
                InputProps={{
                  className: classes.inputField,
                }}
                onChange={(e) => setNombreCliente(e.target.value)}
                value={nombreCliente}
              />
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="street_address_client">
                <RoomIcon className={classes.fieldIcon} />
              </label>
              <TextField
                className={classes.field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Dirección del cliente"
                label="Dirección del cliente"
                id="street_address_client"
                InputProps={{
                  className: classes.inputField,
                }}
                onChange={(e) => setDireccionCliente(e.target.value)}
                value={direccionCliente}
              />
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="city_state_client">
                <LocationCityIcon className={classes.fieldIcon} />
              </label>
              <TextField
                className={classes.field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Ciudad, Estado del cliente"
                label="Ciudad, Estado del cliente"
                id="city_state_client"
                InputProps={{
                  className: classes.inputField,
                }}
                onChange={(e) => setCiudadEstadoCliente(e.target.value)}
                value={ciudadEstadoCliente}
              />
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="zip_client">
                <Mail className={classes.fieldIcon} />
              </label>
              <TextField
                className={classes.field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Código postal del cliente"
                label="Código postal del cliente"
                id="zip_client"
                InputProps={{
                  className: classes.inputField,
                }}
                onChange={(e) => setCodigoPostalCliente(e.target.value)}
                value={codigoPostalCliente}
              />
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="rfc_rec">
                <ContactMailIcon className={classes.fieldIcon} />
              </label>
              <TextField
                className={classes.field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="RFC Receptor"
                label="RFC Receptor"
                id="rfc_rec"
                InputProps={{
                  className: classes.inputField,
                }}
                onChange={(e) => setRFC_Rec(e.target.value)}
                value={rfc_rec}
              />
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="regimen">
                <AccountBalanceIcon className={classes.fieldIcon} />
              </label>
              {(!regimen && file) ? null : (
                <Select
                  className={classes.fieldSelect}
                  options={regimen_options}
                  placeholder="Régimen"
                  defaultValue={regimen_options[regimen - 1]}
                  onChange={(e) => setRegimen(e.value)}
                />
              )}
            </div>
          </div>
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        component={Paper}
        elevation={6}
        square
        className={classes.loginContainer}
      >
        <div className={classes.paper}>
          <Text>Datos del producto</Text>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="descripcion">
                <BookIcon className={classes.fieldIcon} />
              </label>
              <TextField
                className={classes.field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Descripción del producto"
                label="Descripción del producto"
                id="descripcion"
                InputProps={{
                  className: classes.inputField,
                }}
                onChange={(e) => setDescripcion(e.target.value)}
                value={descripcion}
              />
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="cantidad">
                <LocalOfferIcon className={classes.fieldIcon} />
              </label>
              <TextField
                className={classes.field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Cantidad"
                label="Cantidad"
                id="cantidad"
                type="number"
                InputProps={{
                  className: classes.inputField,
                }}
                onChange={(e) => setCantidad(e.target.value)}
                value={cantidad}
              />
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="cantidad">
                <AttachMoneyIcon className={classes.fieldIcon} />
              </label>
              <TextField
                className={classes.field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Valor unitario"
                label="Valor unitario"
                id="valor"
                type="number"
                InputProps={{
                  className: classes.inputField,
                }}
                onChange={(e) => setValor(e.target.value)}
                value={valor}
              />
            </div>
          </div>

          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="cond_pago">
                <BookmarksIcon className={classes.fieldIcon} />
              </label>
              {(!cond_pago && file) ? null : (
                <Select
                  className={classes.fieldSelect}
                  options={cond_pago_options}
                  placeholder="Condición de pago"
                  onChange={(e) => setCond_pago(e.value)}
                  defaultValue={cond_pago_options[cond_pago - 1]}
                />
              )}
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.textFieldContainer}>
              <label htmlFor="metodo_pago">
                <PaymentsIcon className={classes.fieldIcon} />
              </label>
              {(!metodo_pago && file) ? null : (
                <Select
                  className={classes.fieldSelect}
                  options={metodo_pago_options}
                  placeholder="Método de pago"
                  onChange={(e) => setMetodo_pago(e.value)}
                  defaultValue={metodo_pago_options[metodo_pago - 1]}
                />
              )}
            </div>
          </div>
        </div>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={blockSendButton}
        onClick={manejarEnvio}
      >
        Registrar factura
      </Button>
    </Grid>
  );
}
