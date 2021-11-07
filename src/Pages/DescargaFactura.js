import React, { useState, useEffect } from "react";
import { Button, TextField, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink} from '@react-pdf/renderer';

// Create styles

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
	page: {
		flexDirection: 'row',
		backgroundColor: '#E4E4E4'
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1
	}
}));

// Create Document Component
export default function DescargaFactura() {
	const classes = useStyles();
	const MyDocument = () => (
		<Document>
		<Page size="A4" style={classes.page} wrap={true}>
			<View style={classes.section}>
			<Text>Section #1</Text>
			</View>
			<View style={classes.section}>
			<Text>Section #2</Text>
			</View>
		</Page>
		</Document>
	);
	return(
		<>
		<PDFDownloadLink document={<MyDocument />} fileName={"FileName"}>
			{/* <Button
				variant="contained"
				color="primary"
				className={classes.submit}
				//disabled={blockSendButton}
				//onClick={() => {manejarEnvio()}}
			>
			Descargar factura
			</Button> */}
			</PDFDownloadLink></>  
	);
}