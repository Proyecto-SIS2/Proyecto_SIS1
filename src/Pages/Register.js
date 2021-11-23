import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";

import PersonIcon from "@material-ui/icons/Person";
import MailIcon from "@material-ui/icons/Mail";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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

export default function Register() {
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [contra, setContra] = useState("");
	const [correo, setCorreo] = useState("");
	const [usuario, setUsuario] = useState("");

	const [verifyAvailable, setVerifyAvailable] = useState(false);
	const [flagUser, setFlagUser] = useState(false);
	const [flagEmail, setFlagEmail] = useState(false);
	const [blockSendButton, setBlockSendButton] = useState(true);

	const [entryState, setEntryState] = useState(false);
	
	useEffect(() => {
		if(usuario){
			Service.postData("user/check_available_user", usuario).then((data) => {
				if(data.estadoUser){
					document.getElementById("existent-user").style.display = "none";
					setFlagUser(false);
					setVerifyAvailable(true);
				}else{
					document.getElementById("existent-user").style.display = "initial";
                    setFlagUser(true);
					setVerifyAvailable(false);
                }
			});
		}else{
			document.getElementById("existent-user").style.display = "none";
			setFlagUser(false);
			setVerifyAvailable(true);
		}

		if((correo.split("@")[0] && !(correo.split("@")[1])) || (!(correo.split(".")[1]) && correo !== "")){
			document.getElementById("incorrect-email").style.display = "initial";
			document.getElementById("existent-email").style.display = "none";
			setFlagEmail(true);
		}
		else{
			Service.postData("user/check_available_email", correo).then((data) => {
				document.getElementById("incorrect-email").style.display = "none";
				if(data.estadoMail){
					document.getElementById("existent-email").style.display = "none";
					setFlagEmail(false);
					setVerifyAvailable(true);
				}else{
					document.getElementById("existent-email").style.display = "initial";
                    setFlagEmail(true);
					setVerifyAvailable(false);
                }
			});
		}
	},[usuario, correo, flagEmail]);

	useEffect(() => {
		if(nombre && apellido && contra && correo && usuario && verifyAvailable && !flagUser && !flagEmail) {
			setBlockSendButton(false);	
		}else{
			setBlockSendButton(true);
		}
	}, [nombre, apellido, contra, usuario, correo, verifyAvailable, flagUser, flagEmail]);

	const manejarEnvio = (e) => {
		setBlockSendButton(true);
		if (verifyAvailable) {
			const params = {
				nombre: nombre,
				apellido: apellido,
				contra: contra,
				correo: correo,
				usuario: usuario,
			};

			Service.postData("user/register", params).then((res) => {
				if (res.status === "correct") {
					setEntryState(true);
					Toast.fire({
						icon: "success",
						title: "Registro exitoso",
					});
				} else {
					setEntryState(false);
					Toast.fire({
						icon: "error",
						title: "Fallo en el registro",
					});
				}
			});
		} else {
			setBlockSendButton(false);
			return;
		}
	};

	const classes = useStyles();
	let checkID = entryState;
	return (
		<Grid container className={classes.root}>
			{checkID ? <Redirect to="/" /> : null}
			<Grid item xs={12} sm={6}>
				<img src={logo} alt="Logo" className={classes.logoImg} />
			</Grid>
			<Grid item xs={12} sm={6} component={Paper} elevation={6} square className={classes.loginContainer}>
				<div className={classes.paper}>
						<div className={classes.fieldContainer}>
							<div className={classes.textFieldContainer}>
								<label htmlFor="nombre">
									<PersonIcon className={classes.fieldIcon} />
								</label>
								<TextField
									className={classes.field}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									name="Nombre"
									label="Nombre"
									id="nombre"
									autoComplete="nombre"
									InputProps={{
										className: classes.inputField,
									}}
									onChange={(e) => setNombre(e.target.value)}
									value={nombre}
								/>
							</div>
						</div>
						<div className={classes.textFieldContainer}>
							<label htmlFor="apellido">
								<PersonIcon className={classes.fieldIcon} />
							</label>
							<TextField
								className={classes.field}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="Apellido"
								label="Apellido"
								id="apellido"
								autoComplete="apellido"
								InputProps={{
									className: classes.inputField,
								}}
								onChange={(e) => setApellido(e.target.value)}
								value={apellido}
							/>
						</div>
						<div className={classes.textFieldContainer}>
							<label htmlFor="usuario">
								<AccountCircleIcon className={classes.fieldIcon} />
							</label>
							<TextField
								className={classes.field}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="Usuario"
								label="Usuario"
								id="usuario"
								autoComplete="usuario"
								InputProps={{
									className: classes.inputField,
								}}
								onChange={(e) => setUsuario(e.target.value)}
								value={usuario}
								error={flagUser}
							/>
						</div>
						<p id="existent-user" className={classes.alertText}>
								Este usuario ya se encuentra registrado
						</p>
						<div className={classes.fieldContainer}>
							<div className={classes.textFieldContainer}>
								<label htmlFor="correo">
									<MailIcon className={classes.fieldIcon} />
								</label>
								<TextField
									className={classes.field}
									variant="outlined"
									required
									margin="normal"
									fullWidth
									name="Correo"
									label="Correo"
									type="email"
									id="correo"
									autoComplete="email"
									InputProps={{
										className: classes.inputField,
									}}
									onChange={(e) => setCorreo(e.target.value)}
									value={correo}
									error={flagEmail}
								/>
							</div>
							<p id="existent-email" className={classes.alertText}>
								Este correo ya se encuentra registrado
							</p>
							<p id="incorrect-email" className={classes.alertText}>
									Este correo no es válido
							</p>
						</div>
						<div className={classes.textFieldContainer}>
							<label htmlFor="contra">
								<LockIcon className={classes.fieldIcon} />
							</label>
							<TextField
								className={classes.field}
								variant="outlined"
								required
								margin="normal"
								fullWidth
								name="Contraseña"
								label="Contraseña"
								type="password"
								id="contra"
								autoComplete="current-password"
								InputProps={{
									className: classes.inputField,
								}}
								onChange={(e) => setContra(e.target.value)}
								value={contra}
							/>
						</div>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={blockSendButton}
							onClick={() => {manejarEnvio()}}
						>
							Registrarse
						</Button>
						<Grid container alignItems="center" direction="column">
							<Grid item xs={12}>
								<Link variant="body2" to="/" className={classes.textLink}>
									¿Ya tienes cuenta?
								</Link>
							</Grid>
						</Grid>
				</div>
			</Grid>
		</Grid>
	);
}
