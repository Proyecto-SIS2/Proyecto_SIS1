import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Service from '../Service';
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import { Redirect } from 'react-router-dom';

const logo =
	"https://firebasestorage.googleapis.com/v0/b/erp-cni.appspot.com/o/icons%2Flogo-white.png?alt=media&token=6a4a04ad-7422-4621-86f8-0ec3b9f3aac8";

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

export default function PChange() {
	const classes = useStyles();
	let [changeStatus, setChangeState] = useState(true);
    let [changeIt, setChangeItState]=useState(false);
    let [email, setEmail] = useState("");
    let [token, setToken] = useState("");
    let [newPassword, setNewPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [error, setError] = useState(false);

	/*const recibirDatos = (e) => {
		setNombre(e);
		console.log(nombre);
	};*/

	const handleChange=(e) =>{
    	const id = e.target.id;
    	const value = e.target.value;
		switch(id){
            case "Email":
                setEmail(value);
                break;
            case "Token":
                setToken(value);
                break;
        }
  	}
    const handleConfirm=(e) =>{
    	const id = e.target.id;
    	const value = e.target.value;
        if(id==="ccontra"){
            setConfirmPassword(value);
        }
		if(id=== "ncontra"){
            setNewPassword(value);
        }
        if(newPassword != confirmPassword){
            setError(true);
        }
        if(newPassword==confirmPassword){
            setError(true);
        }
  	}
    const handleConfirm2=(e) =>{
        const id = e.target.id;
        const value = e.target.value;
        
        if(newPassword !== confirmPassword){
            setError(true);
        }
        if(newPassword===confirmPassword){
            setError(true);
        }
  	}

	
    const inChange = (e) => {

        setChangeState("true");
        if(email!=""){
            const values = {
                email: email,
            };
            Service.postData("user/cpassword", values).then((data) => {
                updateChangeStatus(data);
            });
        }else{
            alert("Por favor Rellene todos los campos");
        } 
    }
    const updateChangeStatus = (data) => {
        if(data.state === "not-found"){
            alert("El correo no esta ligadoa una cuenta registrada");
        }else if(data.state === "generate"){
            setChangeState(true);
        }
    }
	const replacePassword=(e)=>{
        if(newPassword!=="" && confirmPassword !=="" && token!==""){
            const values = {
                token: token,
                npsws:newPassword,
                cpswd:confirmPassword
            };
            Service.postData("user/replacepaswd", values).then((data) => {
                if(data.state==="replace-it"){
                    setChangeItState(true);
                }else{
                    alert("token invalido")
                }
            });
        }else{
            alert("Por favor Rellene todos los campos");
        } 
    }
	return (
		<Grid container className={classes.root}>
			{changeIt ? <Redirect to="/login"/> : null}
			<Grid item xs={12} sm={6}>
				<img src={logo} alt="Logo CNI" className={classes.logoImg} />
			</Grid>
			<Grid item xs={12} sm={6} component={Paper} elevation={6} square className={classes.loginContainer}>
				<div className={classes.paper}>
                        {!changeStatus && 
					        <div className={classes.form} noValidate >
                                <div className={classes.textFieldContainer}>
                                    <label htmlFor="user">
                                        <PersonIcon className={classes.fieldIcon} />
                                    </label>
                                    <TextField
                                        className={classes.field}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="Email"
                                        label="Correo Electrónico"
                                        id="Email"
                                        autoComplete="mail"
                                        autoFocus
                                        InputProps={{
                                            className: classes.inputField,
                                        }}
                                        /*onChange={(e) => {
                                            recibirDatos(e.target.value);
                                        }}*/
                                        onChange={handleChange}
                                    />
                                </div>
                                <Button onClick={inChange} fullWidth variant="contained" color="primary" className={classes.submit}>
                                    Solicitar cambio
                                </Button>
					        </div>
                        }
                        {changeStatus && 
					        <div className={classes.form}>
                                <div className={classes.textFieldContainer}>
                                    <label htmlFor="user">
                                        <PersonIcon className={classes.fieldIcon} />
                                    </label>
                                    <TextField
                                        className={classes.field}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="Token"
                                        label="Token"
                                        id="Token"
                                        autoFocus
                                        InputProps={{
                                            className: classes.inputField,
                                        }}
                                        /*onChange={(e) => {
                                            recibirDatos(e.target.value);
                                        }}*/
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={classes.textFieldContainer}>
                                    <label htmlFor="user">
                                        <PersonIcon className={classes.fieldIcon} />
                                    </label>
                                    <TextField
                                        className={classes.field}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="ncontra"
                                        label="Nueva contraseña"
                                        id="ncontra"
                                        autoFocus
                                        InputProps={{
                                            className: classes.inputField,
                                        }}
                                        onChange={handleConfirm}
                                    />
                                </div>
                                <div className={classes.textFieldContainer}>
                                    <label htmlFor="user">
                                        <PersonIcon className={classes.fieldIcon} />
                                    </label>
                                    <TextField
                                        className={classes.field}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="ccontra"
                                        label="Corfirma contraseña"
                                        id="ccontra"
                                        autoFocus
                                        InputProps={{
                                            className: classes.inputField,
                                        }}
                                        error={error}
                                        onChange={handleConfirm}
                                        onBlur={handleConfirm2}
                                    />
                                </div>
                                <Button type="button" onClick={replacePassword} fullWidth variant="contained" color="primary" className={classes.submit}>
                                    Cambiar
                                </Button>
					        </div>
                        }
				</div>
			</Grid>
		</Grid>
	);
}
