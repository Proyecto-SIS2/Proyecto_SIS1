import React, {useState, useEffect, useMemo, componentDidMount} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Link } from "react-router-dom";
import htmlToPdfmake from 'html-to-pdfmake';
import { makeStyles } from "@material-ui/core/styles";
import { Paper, List, Typography, ListItem, Button } from "@material-ui/core";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import Service from "../Service";
import ReactLoading from "react-loading";
import '../App.css';

const useStyles = makeStyles((theme) => ({
	card: {
		backgroundColor: theme.palette.background.dark,
		margin: "0 auto",
		maxWidth: "700px",
		width: "100%",
	},
	usuariosBtns: {
		display: "flex",
		justifyContent: "space-evenly",
		padding: "0 20px 20px 20px ",
	},
	cardName: {
		color: theme.palette.secondary.main,
		fontSize: "2rem",
		fontWeight: "bold",
		textAlign: "center",
	},
	cardList: {
		width: "100%",
		padding: 20,
	},
	cardItem: {
		color: theme.palette.text.light,
		fontSize: "1.8rem",
		display: "flex",
		justifyContent: "center",
	},
	cardIcons: {
		fontSize: "2.5rem",
		marginInlineEnd: "1rem",
	},
	addBtn: {
		fontSize: "1.6rem",
		textTransform: "capitalize",
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.light,
		transition: ".5s",
		"&:hover": {
			backgroundColor: theme.palette.background.default,
			color: theme.palette.secondary.main,
			transition: ".5s",
		},
	},
	mailLink: {
		color: theme.palette.text.light,
		textDecoration: "none",
	},
	leadsBtns: {
		display: "flex",
		justifyContent: "space-evenly",
		padding: "0 20px 20px 20px ",
	},
	leadsLink: {
		textDecoration: "none",
		"&:hover": {
			textDecoration: "none",
		},
	},
}));


export default function FacturaGenerada(){
    const classes = useStyles();
	const [booleana, setBooleana] = useState(false);
	const [invoice, setInvoice] = useState([]);
	const [datos, setDatos] = useState([]);
	const id = localStorage.getItem("id_factura");
  
	useEffect (()=> {
		Service.postData("facturas/get_factura", {id: id}).then((res) =>{
			setInvoice(res);
			setBooleana(true);
		})
	}, []);

    function printDocument(){ 
		console.log(invoice[0].id_factura);
		const doc = new jsPDF();
		const pdfTable = document.getElementById('divToPrint');
		var html = htmlToPdfmake(pdfTable.innerHTML);
	
		const documentDefinition = { content: html };
		pdfMake.vfs = pdfFonts.pdfMake.vfs;
		pdfMake.createPdf(documentDefinition).open();  
    }

	if(booleana){
    return (
    		<><div className="App container mt-5">
						<div id="divToPrint" className="m-3">
							<div class="row d-flex justify-content-center">
								<div class="col-md-8">
									<div class="card">
										<div class="d-flex flex-row p-2">
											<div class="d-flex flex-column"> <span class="font-weight-bold">Factura no°</span>{invoice[0].id_factura}</div>

										</div>

										<hr />
										<div class="table-responsive p-2">
											<table class="table table-borderless">
												<tbody>
													<tr class="add">
														<td>Expedido</td>
														<td>Remitente</td>
													</tr>
													<tr class="content">
														<td class="font-weight-bold">Google <br />{invoice[0].id_factura}<br />Australia</td>
														<td class="font-weight-bold">Facebook <br /> {invoice[0].id_factura} <br /> USA</td>
													</tr>
												</tbody>
											</table>
										</div>
										<hr />
										<div class="products p-2">
											<table class="table table-borderless">
												<tbody>
													<tr class="add">
														<td>Description</td>
														<td>Days</td>
														<td>Price</td>
														<td class="text-center">Total</td>
													</tr>
													<tr class="content">
														<td>Website Redesign</td>
														<td>15</td>
														<td>$1,500</td>
														<td class="text-center">$22,500</td>
													</tr>
													<tr class="content">
														<td>Logo & Identity</td>
														<td>10</td>
														<td>$1,500</td>
														<td class="text-center">$15,000</td>
													</tr>
													<tr class="content">
														<td>Marketing Collateral</td>
														<td>3</td>
														<td>$1,500</td>
														<td class="text-center">$4,500</td>
													</tr>
												</tbody>
											</table>
										</div>
										<hr />
										<div class="products p-2">
											<table class="table table-borderless">
												<tbody>
													<tr class="add">
														<td></td>
														<td>Subtotal</td>
														<td>GST(10%)</td>
														<td class="text-center">Total</td>
													</tr>
													<tr class="content">
														<td></td>
														<td>$40,000</td>
														<td>2,500</td>
														<td class="text-center">$42,500</td>
													</tr>
												</tbody>
											</table>
										</div>
										<hr />
										<div class="address p-2">
											<table class="table table-borderless">
												<tbody>
													<tr class="add">
														<td>Bank Details</td>
													</tr>
													<tr class="content">
														<td> Bank Name: ADS BANK <br /> Swift Code: 00220022 <br /> Account Holder: Jassa Pepper <br /> Account Number: 6953PO789 <br /> </td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div><div className={classes.usuariosBtns}>
							<Link to="/tablero" className={classes.leadsLink}>
								<Button
									type="submit"
									variant="contained"
									className={classes.addBtn}
									startIcon={<KeyboardReturnIcon />}
								>
									Regresar a Facturas
								</Button>
							</Link>

							<Button
								type="submit"
								variant="contained"
								className={classes.addBtn}
								onClick={printDocument}
							>
								Exportar a PDF
							</Button>
						</div></>
 	)
	}
	else{
		return(
			
			<ReactLoading type="spin" color ="#ccc" />
		);
	}
}