import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, InputLabel, Grid, Paper, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Title from "./Title";
import Service from "../Service";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
	paper: {
		alignItems: "center",
		backgroundColor: theme.palette.background.dark,
		display: "flex",
		flexDirection: "column",
		padding: 20,
		maxWidth: "800px",
		margin: "0 auto",
		width: "100%",
	},
	item: {
		margin: "10px 0",
		width: "60%",
		textAlign: "center",
		background: theme.palette.background.default,
		padding: "1rem",
		borderRadius: "5px",
	},
	inputLabels: {
		fontSize: "1.8rem",
		color: theme.palette.text.light,
		fontWeight: 600,
	},
	input: {
		width: "100%",
		fontSize: "1.8rem",
		"& .MuiInput-underline:before": {
			borderColor: theme.palette.text.light,
		},
		"& .MuiInput-underline:hover:not(.Mui-disabled):before": {
			borderColor: theme.palette.text.light,
		},
	},
	inputProps: {
		fontSize: "1.6rem",
		color: theme.palette.text.light,
		width: "80%",
	},
	btnStep: {
		whiteSpace: "nowrap",
		fontSize: "1.6rem",
		textTransform: "capitalize",
		margin: "1rem",
		backgroundColor: theme.palette.background.default,
		color: 'black',
		transition: ".5s",
		"&:hover": {
			backgroundColor: theme.palette.background.default,
			color: theme.palette.secondary.main,
			transition: ".5s",
		},
	},
	alertText: {
		color: "red",
		fontSize: "1.6rem",
		position: "relative",
		marginInlineStart: "50px",
		display: "none",
	}
}));

export default function CardEditSettings() {
	const [usuarioS, setUsuarioS] = React.useState([]);
	const [boolean, setBoolean] = React.useState(false);
	const idu=localStorage.getItem("id");
	const classes = useStyles();

	const [usuario, setUsuario]  = useState("");
	const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
	const [correo, setCorreo] = useState("");

	const [verifyAvailable, setVerifyAvailable] = useState(false);
	const [blockSendButton, setBlockSendButton] = useState(true);
	const [nameHasChanged, setNameHasChanged] = useState(false);
	const [lastNameHasChanged, setLastNameHasChanged] = useState(false);
	const [usernameHasChanged, setUsernameHasChanged] = useState(false);
	const [emailHasChanged, setEmailHasChanged] = useState(false);

	const [entryState, setEntryState] = useState(false);

	const [flagName, setFlagName] = useState(false);
    const [flagLastName, setFlagLastName] = useState(false);
	const [flagUser, setFlagUser] = useState(false);
    const [flagEmail, setFlagEmail] = useState(false);
	
	const [logoutState, setLogoutState] = useState(false);

	useEffect(() => {
		let nombreAux = usuarioS.map((f)=> f.nombre);
		let apellidoAux = usuarioS.map((f)=> f.apellido);
		let usernameAux = usuarioS.map((f)=> f.username);
		let correoAux = usuarioS.map((f)=> f.correo);

		if(nombre === nombreAux[0]){
			setFlagName(false);			
		}else if(nombre === ""){			
			setBlockSendButton(true);
			setFlagName(true);		
		}else{
			setNameHasChanged(true);
			setFlagName(false);
		}

		if(apellido === apellidoAux[0]){
			setFlagLastName(false);			
		}else if(apellido === ""){
			setBlockSendButton(true);
			setFlagLastName(true);
		}else{
			setLastNameHasChanged(true);
			setFlagLastName(false);
		}

		if(usuario === usernameAux[0]){
			document.getElementById("existent-user").style.display = "none";
			
			setFlagUser(false);
		}else if(usuario === ""){
			setBlockSendButton(true);
			setFlagUser(true);
		}else{
			Service.postData("user/check_available_user", usuario).then((data) => {
				if(data.estadoUser){
					document.getElementById("existent-user").style.display = "none";
					setUsernameHasChanged(true);
					setFlagUser(false);
				}else{
					document.getElementById("existent-user").style.display = "initial";
                    setFlagUser(true);
                }
			});
		}
	
		if(correo === correoAux[0]){
			document.getElementById("existent-email").style.display = "none";
			setFlagEmail(false);		
		}else if(correo === ""){
			setBlockSendButton(true);
			setFlagEmail(true);
		}
		else if(((correo.split("@")[0]) && (!correo.split("@")[1])) || (!correo.split(".")[1])){
			document.getElementById("incorrect-email").style.display = "initial";
			document.getElementById("existent-email").style.display = "none";
			setFlagEmail(true);
		}
		else{
			Service.postData("user/check_available_email", correo).then((data) => {
				document.getElementById("incorrect-email").style.display = "none";
				if(data.estadoMail){
					document.getElementById("existent-email").style.display = "none";
					setEmailHasChanged(true);
					setFlagEmail(false);
				}else{
					document.getElementById("existent-email").style.display = "initial";
                    setFlagEmail(true);
                }
			});
		}

		if((nameHasChanged || lastNameHasChanged || usernameHasChanged || emailHasChanged) && (!flagName && !flagLastName && !flagUser && !flagEmail ) && (nombre !== nombreAux[0] || apellido !== apellidoAux[0] || usuario !== usernameAux[0] || correo !== correoAux[0])){
			setBlockSendButton(false);
			setVerifyAvailable(true);
		}else{
			setBlockSendButton(true);
		}
		
	}, [nombre, apellido, usuario, correo, usuarioS, nameHasChanged, lastNameHasChanged, usernameHasChanged, emailHasChanged, flagName, flagLastName, flagUser, flagEmail]);

	const getSetting = () => {
		if (!boolean) {
			Service.postData("user/get_user_settings", {id:idu}).then((res) =>{
				setUsuarioS(res);
				setNombre(res[0].nombre);
				setApellido(res[0].apellido);
				setCorreo(res[0].correo);
				setUsuario(res[0].username);
			})
			setBoolean(true);
		}
	};

	const updateUser = (e) => {
		setBlockSendButton(true);
		if(verifyAvailable){
			const params = {
					usuario: usuario,
					correo: correo,
					nombre: nombre,
					apellido: apellido,
					id:idu
			}
			Service.postData("user/update_user", params).then((res) => {
				console.log(res);
				if(res.status){
					setEntryState(true);
				}else{
					setEntryState(false);
				}
			});
		}else{
			setBlockSendButton(false);
		}
	};

	const closeUser = (e) => {
		const params = {
			id:idu
		}
		Service.postData("user/logout", params).then((res) => {
			if(res.status){
				setLogoutState(true);
				localStorage.clear();
			}
		});
	};
	
	getSetting();
	return (
		<Fragment>
			{entryState ? window.location.reload() : null}
			<Title>Ajustes de usuario</Title>
			{usuarioS &&
				usuarioS.map((user) => {
					return (
						<Grid as={Paper} className={classes.paper} spacing={3}>
							<Grid item xs={12} className={classes.item}>
								<div>
								<InputLabel className={classes.inputLabels}>Nombre</InputLabel>
								<TextField
									inputProps={{ className: classes.inputProps }}
									className={classes.input}
									name="name"
									id="standard-basic"
									placeholder="Nombre"
									defaultValue={user.nombre} 
									onChange={(e) => setNombre(e.target.value)}
                                    error={flagName}
								/>
								<p id="no-name" className={classes.alertText}>
									Ingrese un nombre
								</p>
								</div>
                                
							</Grid>
                            <Grid item xs={12} className={classes.item}>
								<InputLabel className={classes.inputLabels}>Apellido</InputLabel>
								<TextField
									inputProps={{ className: classes.inputProps }}
									className={classes.input}
									name="lastName"
									id="standard-basic"
									placeholder="Apellido"
									defaultValue={user.apellido} 
									onChange={(e) => setApellido(e.target.value)}
                                    error={flagLastName}
									
								/>
								{/* <p id="no-lastname" className={classes.alertText}>
									Ingrese un apellido
								</p> */}
							</Grid>
							<Grid item xs={12} className={classes.item}>
								<InputLabel className={classes.inputLabels}>Usuario</InputLabel>
								<TextField
									inputProps={{ className: classes.inputProps }}
									className={classes.input}
									name="username"
									id="standard-basic"
									placeholder="Usuario"
									defaultValue={user.username} 
									onChange={(e) => setUsuario(e.target.value)}
                                    error={flagUser}
								/>
								<p id="existent-user" className={classes.alertText}>
									Este usuario ya se encuentra registrado
								</p>
								
							</Grid>
							<Grid item xs={12} className={classes.item}>
								<div>
								<InputLabel className={classes.inputLabels}>Correo</InputLabel>
								<TextField
									inputProps={{ className: classes.inputProps }}
									className={classes.input}
									name="email"
									id="standard-basic"
									placeholder="Correo"
									defaultValue={user.correo} 
									onChange={(e) => setCorreo(e.target.value)}
									error={flagEmail}
								/>
								<p id="existent-email" className={classes.alertText}>
									Este correo ya se encuentra registrado
								</p>
								<p id="incorrect-email" className={classes.alertText}>
									Este correo no es válido
								</p>
								<p id="no-email" className={classes.alertText}>
									Ingrese un correo
								</p>
								</div>
							</Grid>
							<Box display="flex">
									<Grid item xs={12}>
									{logoutState ? <Redirect to="/"/>: null}
										<Button 
                                            type="submit" 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={() => { closeUser() }} 
                                            className={classes.btnStep} 
                                            startIcon={<ExitToAppIcon />} 
                                            style={{ height:"45px", width:"auto" }}>
										Cerrar Sesión
										</Button>
									</Grid>
								<Grid item xs={12}>
									<Button 
                                        type="submit"  
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => { updateUser() }} 
                                        className={classes.btnStep} 
                                        disabled={blockSendButton} 
                                        startIcon={<SaveIcon />} 
                                        style={{ height:"45px", width:"auto" }}>
									Guardar
									</Button>
								</Grid>
							</Box>
						</Grid>
					);
				})}
		</Fragment>
	);
}
