import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import Select from 'react-select'

import PersonIcon from "@material-ui/icons/Person";
import { Redirect } from "react-router-dom";
import Service from "../Service";
import logo from "../Images/logo.png"

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: "1200px",
		margin: "0 auto",
		[[theme.breakpoints.up("sm")]]: {
			alignItems: "center",
			height: "100vh",
		},
	},
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: theme.palette.background.default,
		padding: 20,
	},
	logoImg: {
		width: "50%",
		display: "block",
		margin: "0 auto",
		padding: "20px 0",
		[[theme.breakpoints.up("sm")]]: {
			width: "100%",
			padding: "20px",
		},
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
		"&:hover fieldset:not(.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline)": {
			borderColor: `${theme.palette.primary.main} !important`,
		},
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
	position: "top",
	showConfirmButton: false,
	timer: 1500,
	timerProgressBar: true,
});

const cond_pago_options = [
	{ value: 'Pago al contado', label: 'Pago al contado' },
	{ value: 'Pago anticipado', label: 'Pago anticipado' },
	{ value: 'Pago aplazado', label: 'Pago aplazado' }
  ]

const metodo_pago_options = [
	{ value: 'Pago en efectivo', label: 'Pago en efectivo' },
	{ value: 'Cheque', label: 'Cheque' },
	{ value: 'Transferencia bancaria', label: 'Transferencia bancaria' }
  ]

export default function Factura({changePage}) {
	const [rfc_exp, setRFC_Exp] = useState("");
	const [rfc_rec, setRFC_Rec] = useState("");
	const [regimen, setRegimen] = useState("");
	const [impuestos, setImpuestos] = useState("");
	const [cond_pago, setCond_pago] = useState("");
	const [metodo_pago, setMetodo_pago] = useState("");
	const [id_factura, setId_factura] = useState("");

	const idu=localStorage.getItem("id");

	const [blockSendButton, setBlockSendButton] = useState(true);
	const [entryState, setEntryState] = useState(false);

	useEffect(() => {
		if(rfc_exp && rfc_rec && regimen && impuestos){
			setBlockSendButton(false);
		}
	}, [rfc_exp, rfc_rec, regimen, impuestos, cond_pago, metodo_pago]);

	const manejarEnvio = (e) => {
		
		setBlockSendButton(true);
			const params = {
				rfc_exp: rfc_exp,
				rfc_rec: rfc_rec,
				regimen: regimen,
				impuestos: impuestos,
				cond_pago: cond_pago,
				metodo_pago: metodo_pago,
				id: idu
			};
		
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
			<Grid item xs={12} sm={6}>
				<img src={logo} alt="Logo" className={classes.logoImg} />
			</Grid>
			<Grid item xs={12} sm={6} component={Paper} elevation={6} square className={classes.loginContainer}>
				<div className={classes.paper}>
						<div className={classes.fieldContainer}>
							<div className={classes.textFieldContainer}>
								<label htmlFor="rfc_exp">
									<PersonIcon className={classes.fieldIcon} />
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
									autoFocus
									InputProps={{
										className: classes.inputField,
									}}
									onChange={(e) => setRFC_Exp(e.target.value)}
									value={rfc_exp}
								/>
							</div>
						</div>
						<div className={classes.fieldContainer}>
							<div className={classes.textFieldContainer}>
								<label htmlFor="rfc_rec">
									<PersonIcon className={classes.fieldIcon} />
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
									autoFocus
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
									<PersonIcon className={classes.fieldIcon} />
								</label>
								<TextField
									className={classes.field}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									name="Régimen"
									label="Régimen"
									id="regimen"
									autoFocus
									InputProps={{
										className: classes.inputField,
									}}
									onChange={(e) => setRegimen(e.target.value)}
									value={regimen}
								/>
							</div>
						</div>
						<div className={classes.fieldContainer}>
							<div className={classes.textFieldContainer}>
								<label htmlFor="impuestos">
									<PersonIcon className={classes.fieldIcon} />
								</label>
								<TextField
									className={classes.field}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									name="Impuestos"
									label="Impuestos"
									id="impuestos"
									autoFocus
									InputProps={{
										className: classes.inputField,
									}}
									onChange={(e) => setImpuestos(e.target.value)}
									value={impuestos}
								/>
							</div>
						</div>
						<div className={classes.fieldContainer}>
							<div className={classes.textFieldContainer}>
								<label htmlFor="cond_pago">
									<PersonIcon className={classes.fieldIcon} />
								</label>
								<Select 
									options={cond_pago_options} 
									placeholder="Condición de pago" 
									onChange={(e) => setCond_pago(e.value)}						
									/>
							</div>
						</div>
						<div className={classes.fieldContainer}>
							<div className={classes.textFieldContainer}>
								<label htmlFor="metodo_pago">
									<PersonIcon className={classes.fieldIcon} />
								</label>
								<Select 
									options={metodo_pago_options} 
									placeholder="Método de pago" 
									onChange={(e) => setMetodo_pago(e.value)}	
								/>
							</div>
						</div>
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
						
				</div>
			</Grid>
		</Grid>
	);
}