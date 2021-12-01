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
		fontSize: "1.2rem",
		display: "flex",
		justifyContent: "space-between",
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
	data: {
		display: "flex",
		marginLeft: "10px",
		justifyContent: "space-between",
		d: "flex",
		flex: "row",
		p: "2",
		font: "weight-bold",
		fontSize: "1.2rem"
	},
	cardItemProduct: {
		color: theme.palette.text.light,
		fontSize: "1.2rem",
		display: "flex",
		marginRight: "10px",
		justifyContent: "flex-end",
	},
	dataInv: {
		display: "flex",
		margin: "10px",
		justifyContent: "space-between",
		d: "flex",
		flex: "row",
		p: "2",
		font: "weight-bold",
		fontSize: "1.2rem"
	},
	dataTitle: {
		display: "flex",
		marginLeft: "10px",
		marginTop: "10px",
		justifyContent: "space-between",
		d: "flex",
		flex: "row",
		p: "2",
		font: "weight-bold",
		fontSize: "1.2rem"
	},
	invoiceTitle: {
		color: theme.palette.text.light,
		fontSize: "1.2rem",
		display: "flex",
		backgroundColor: "#A9D2FA",
		justifyContent: "space-between",
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
		
		const documentDefinition = { content: html, info: {title: `FAC-${idNumber}${invoice[0].id_factura.toString()}`}};
		console.log(documentDefinition);
		pdfMake.vfs = pdfFonts.pdfMake.vfs;
		pdfMake.createPdf(documentDefinition).open();  
    }

	if(booleana){
		let subtotal = 0;
		let impuestos = 0;
		var idNumber = "";
		switch(invoice[0].id_factura.length){
			case 1: 
				idNumber = "0000"
				break;
			case 2:
				idNumber = "000"
				break;
			case 3:
				idNumber = "00"
				break;
			case 4:
				idNumber = "0"
				break;
			default:
				idNumber = "00000"
		}
    	return (
    		<><div className="App container mt-5">
				<div id="divToPrint" className="m-3">
					<div className="row d-flex justify-content-center">
						<div className="col-md-8">
							<div className="card">
							<div className={classes.cardItem}>
									<span className={classes.dataTitle}><strong>Empresa</strong></span><br/>
								</div>
								<div className={classes.cardItem}>
									<span className={classes.dataTitle}>{`[${invoice[0].nombre_empresa}]`}</span><br/>
								</div>
								<div>
									<span className={classes.data}>Nombre: {`[${invoice[0].nombre_facturador}]`}</span>
								</div>
								<div>
									<span className={classes.data}>Dirección: {`[${invoice[0].direccion_empresa}]`}</span>
								</div>
								<div>
									<span className={classes.data}>Ciudad, Estado: {`[${invoice[0].ciudad_estado}]`}</span>
									
								</div>
								<div>
									<span className={classes.data}>Código Postal: {`[${invoice[0].zip_empresa}]`}</span>
									
								</div>
								<div>
									<span className={classes.data}>Teléfono: {`[${invoice[0].telefono_empresa}]`}</span>
								</div>
								<div>
									<span className={classes.data}>RFC Expedido: {`[${invoice[0].RFC_Exp}]`}</span>
									
								</div>
								<br />
								<div className={classes.invoiceTitle}>
										<span className={classes.dataInv}>Folio Factura: FAC-{idNumber + invoice[0].id_factura.toString()}</span><br/>
										<span className={classes.dataInv}>Fecha: {invoice[0].fecha}</span>
								</div>

								<div className={classes.cardItem}>
									<span className={classes.dataTitle}><strong>Cliente</strong></span><br/>
								</div>
								<div>
									<span className={classes.data}>Nombre: {`[${invoice[0].nombre_cliente}]`}</span>
								</div>
								<div>
									<span className={classes.data}>Dirección: {`[${invoice[0].direccion_cliente}]`}</span>
								</div>
								<div>
									<span className={classes.data}>Ciudad, Estado: {`[${invoice[0].ciudad_cliente}]`}</span>
									
								</div>
								<div>
									<span className={classes.data}>Código Postal: {`[${invoice[0].zip_cliente}]`}</span>
									
								</div>	
								<div>
									<span className={classes.data}>RFC Receptor: {`[${invoice[0].RFC_Rec}]`}</span>
									
								</div>
								<div>
									<span className={classes.data}>Régimen: {`[${invoice[0].regimen}]`}</span>		
								</div>
								<br/>							
								<hr/>
								<div className={classes.cardItem}>
									<span className={classes.dataTitle}><strong>Producto</strong></span><br/>
								</div>
								<div>
								<table className="table table-bordered">
									<tbody>
										<tr className="add">
											<td className={classes.td}>Descripción del producto: </td>
											<td className={classes.td}>Cantidad: </td>
										</tr>
										<tr className="content">
											<td className="font-weight-bold">{invoice[0].descripcion_producto}</td>
											<td className="font-weight-bold">{invoice[0].cantidad}</td>
										</tr>
									</tbody>
								</table>
								<div className={classes.cardItemProduct}>
									<span className={classes.dataProduct}>Precio: ${invoice[0].valor_unitario}</span>
									
								</div>
								<div className={classes.cardItemProduct}>
									<span className={classes.dataProduct}>Subtotal: ${subtotal = (invoice[0].cantidad * invoice[0].valor_unitario)}</span>
									
								</div>
								<div className={classes.cardItemProduct}>
									<span className={classes.dataProduct}>Impuestos: ${impuestos = (subtotal) * (invoice[0].impuestos / 100)}</span>
								</div>
								<div className={classes.cardItemProduct}>
									<span className={classes.dataProduct}>Total: ${subtotal + impuestos}</span>
								</div>

								<div>
									<span className={classes.data}>Condición de pago: {`[${invoice[0].cond_pago}]`}</span>		
								</div>
								<div>
									<span className={classes.data}>Método de pago: {`[${invoice[0].metodo_pago}]`}</span>		
								</div>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
			<div className={classes.usuariosBtns}>
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
	}else{
		return(	
			<ReactLoading type="spin" color ="#ccc" />
		);
	}
}