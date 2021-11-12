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
		color: theme.palette.text.light,
		transition: ".5s",
		"&:hover": {
			backgroundColor: theme.palette.background.default,
			color: theme.palette.secondary.main,
			transition: ".5s",
		},
	},
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

	const [entryState, setEntryState] = useState(false);
    //const [flagMail, setFlagMail] = useState(false);
	const [flagUser, setFlagUser] = useState(false);
    const [flagName, setFlagName] = useState(false);
    const [flagLastName, setFlagLastName] = useState(false);
	const [logoutState, setLogoutState] = useState(false);

	useEffect(() => {
		const values = {
			user: usuario,
			mail: correo,
		};

		if(usuario){
			let userAux = usuarioS.map((f)=> f.username);
			if(userAux[0]===usuario){
				setUsuario("");
				setBlockSendButton(true);
                setFlagUser(false);
				return;
			}
			Service.postData("user/check_available", values).then((data) => {
				if (data.status === "success" ) {
					setBlockSendButton(false);
					setVerifyAvailable(true);
                    
				}else if(!data.estadoUser){
					setFlagUser(true);
					setBlockSendButton(true);
				}else if(data.estadoUser){
                    setFlagUser(false);
                    //setBlockSendButton(false);
                }
			});
		}
        if(!usuario){
            setFlagUser(true);
            setBlockSendButton(true);
        }
		if(correo){
			let mailAux = usuarioS.map((f)=> f.correo);
			if(mailAux[0]===correo){
				setCorreo("");
				setBlockSendButton(true);
				return;
			}
			Service.postData("user/check_available", values).then((data) => {
				if (data.status === "success") {
					setBlockSendButton(false);
					setVerifyAvailable(true);
				}else{
					//setFlagMail(true);
					setBlockSendButton(true);
				}
			});
		}
        if(!correo){
            //setFlagMail(true);
            setBlockSendButton(true);
        }
		if(nombre){
			let nomAux = usuarioS.map((f)=> f.nombre);
			if(nomAux[0]===nombre){
				setBlockSendButton(true);
				return;
			}else{
				setBlockSendButton(false);
				setVerifyAvailable(true);
			}
		}
        if(!nombre && flagName){
            setFlagName(true);
        }
        if(apellido){
            let apeAux = usuarioS.map((f)=> f.apellido);
            if(apeAux[0]===apellido){
                setBlockSendButton(true);
                return;
            }else{
                setBlockSendButton(false);
                setVerifyAvailable(true);
            }
        }
        if(!apellido){
            setFlagLastName(true);
        }
	}, [usuario, correo, nombre, usuarioS, apellido, flagName]);

	const getSetting = () => {
		if (!boolean) {
			Service.postData("user/get_user_settings", {id:idu}).then((res) =>{
				setUsuarioS(res);
			})
			setBoolean(true);
		}
	};

	const updateUser = (e) => {
		setBlockSendButton(true);
		if(verifyAvailable){
			const params = {
					usuarion: usuario,
					correo: correo,
					nombre: nombre,
					id:idu
			}
			Service.postData("user/update_userSet", params).then((res) => {
				if(res.status){
					setVerifyAvailable(true);
					setEntryState(true);
				}else{
					setVerifyAvailable(false);
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

                                
                                
							</Grid>
							<Grid item xs={12} className={classes.item}>
								<InputLabel className={classes.inputLabels}>Correo</InputLabel>
								<TextField
									inputProps={{ className: classes.inputProps }}
									className={classes.input}
									name="email"
									id="standard-basic"
									placeholder="Correo"
									defaultValue={user.correo} 
									onChange={(e) => setCorreo(e.target.value)}
								/>
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
