import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, TextField, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";

import Service from "../Service";

import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
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
		"&:hover fieldset": {
			border: `2px solid ${theme.palette.primary.main} !important`,
		},
		"& fieldset legend": {
			fontSize: "1.1rem",
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

export default function Login() {
	const classes = useStyles();

	let [loginState, setLoginState] = useState("");

	const [usuario, setUsuario] = useState("");
	const [contra, setContra] = useState("");

	const tryLogin = (e) =>{
		const values = {
			usuario: usuario,
			contra: contra,
		};

		if (values.usuario === "") {
			Toast.fire({
				icon: "error",
				title: "Ingresa un usuario válido",
			});
		} else if (values.contra === "") {
			Toast.fire({
				icon: "error",
				title: "Ingresa una contraseña válida",
			});
		}else {
			Service.postData("user/login", values).then((data) => {
				if(data.status){
					updateLoginStatus(data);
				}
			});
		}
	};

	async function updateLoginStatus(data){
		let stateMsg;

		if (data.status === "correct") {
			localStorage.setItem("login", data.status === "correct");
			localStorage.setItem("id", data.id);
			if(localStorage.getItem("id")){
				setLoginState(true);
			}
			//
		} else if (data.status === "incorrect") {
			stateMsg = "Contraseña inválida";

			Toast.fire({
				icon: "error",
				title: stateMsg,
			});

		} else if (data.status === "not-found") {
			stateMsg = "Usuario no encontrado";
			Toast.fire({
				icon: "error",
				title: stateMsg,
			});
		}				
	};

	return (
		<Grid container className={classes.root}>
			{loginState ? <Redirect to="/tablero" /> : null}
			<Grid item xs={12} sm={6}>
				<img src={logo} alt="Logo" className={classes.logoImg} />
			</Grid>
			<Grid item xs={12} sm={6} component={Paper} elevation={6} square className={classes.loginContainer}>
				<div className={classes.paper}>
					<div className={classes.textFieldContainer}>
						<label htmlFor="usuario">
							<PersonIcon className={classes.fieldIcon} />
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
							autoComplete="nickname"
							autoFocus
							InputProps={{
								className: classes.inputField,
							}}
							onChange={(e) => setUsuario(e.target.value)}
						/>
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
						/>
					</div>
					<Button 
						fullWidth variant="contained" 
						color="primary" 
						className={classes.submit}
						onClick={tryLogin}
					>
						Iniciar Sesión
					</Button>
					<Grid container alignItems="center" direction="column">
						<Grid item xs={12}>
							<Link variant="body2" to="/registro" className={classes.textLink}>
								¡Regístrate!
							</Link>
						</Grid>
					</Grid>
				</div>
			</Grid>
		</Grid>
	);
}
