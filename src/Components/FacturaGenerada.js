import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Link } from "react-router-dom";
import htmlToPdfmake from 'html-to-pdfmake';
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import Service from "../Service";
import ReactLoading from "react-loading";
import './Factura.css'

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
	const id = localStorage.getItem("id_factura");
  
	useEffect (()=> {
		Service.postData("facturas/get_factura", {id: id}).then((res) =>{
			setInvoice(res);
			setBooleana(true);
		})
	}, [id]);

    function printDocument(){ 
		const pdfTable = document.getElementById('divToPrint');
		var html = htmlToPdfmake(pdfTable.innerHTML);
	
		const documentDefinition = { content: html };
		pdfMake.vfs = pdfFonts.pdfMake.vfs;
		pdfMake.createPdf(documentDefinition).open();  
    }

	if(booleana){
		let subtotal = 0;
		let impuestos = 0;
		let id = "";
		switch(invoice[0].id_factura.length){
			case 1: 
				id = "0000"
				break;
			case 2:
				id = "000"
				break;
			case 3:
				id = "00"
				break;
			case 4:
				id = "0"
				break;
			default:
				id = "00000"
		}
    	return (
    		<><div className="App container mt-5">
						<div id="divToPrint" className="m-3">
							<div class="row d-flex justify-content-center">
								<div class="col-md-8">
									<div class="card">
										<div class="d-flex flex-row p-2">
										<div class="d-flex flex-column"> <span class="font-weight-bold">Folio Factura</span> <small>FAC-{id + invoice[0].id_factura.toString()}</small> </div>
										</div>

										<hr />
										<div class="table-responsive p-2">
											<table class="table table-borderless">
												<tbody>
													<tr class="add">
														<td>RFC Expedido</td>
														<td>RFC Receptor</td>
													</tr>
													<tr class="content">
														<td class="font-weight-bold">{invoice[0].RFC_Exp}</td>
														<td class="font-weight-bold">{invoice[0].RFC_Rec}</td>
													</tr>
												</tbody>
											</table>
										</div>
										<hr />
										<div class="products p-2">
											<table class="table table-borderless">
												<tbody>
													<tr class="add">
														<td>Descripción del producto</td>
														<td>Cantidad</td>
														<td>Precio</td>
														<td>Subtotal</td>
													</tr>
													<tr class="content">
														<td>{invoice[0].descripcion_producto}</td>
														<td >{invoice[0].cantidad}</td>
														<td>${invoice[0].valor_unitario}</td>
														<td >${subtotal = (invoice[0].cantidad * invoice[0].valor_unitario)}</td>
													</tr>
												</tbody>
											</table>
										</div>
										<hr />
										<div class="products p-2">
											<table class="table table-borderless">
												<tbody>
													<tr class="add">
														<td class="text-center">Subtotal</td>
														<td class="text-center">Impuestos ({invoice[0].impuestos}%)</td>
														<td class="text-center">Total</td>
													</tr>
													<tr class="content">
														<td class="text-center">${subtotal}</td>
														<td class="text-center">${impuestos = (subtotal) * (invoice[0].impuestos / 100)}</td>
														<td class="text-center">${subtotal + impuestos}</td>
													</tr>
												</tbody>
											</table>
										</div>
										<hr />
										<div class="address p-2">
											<table class="table table-borderless">
												<tbody>
													<tr class="add">
														<td>Detalles</td>
													</tr>
													<tr class="content">
														<td> Régimen: {invoice[0].regimen} <br /> Condición de pago: {invoice[0].cond_pago} <br /> Método de pago: {invoice[0].metodo_pago}</td>
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