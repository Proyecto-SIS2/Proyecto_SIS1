import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import SettingsIcon from "@material-ui/icons/Settings";
import Service from "../Service";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		height: "80px",
	},
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		backgroundColor: theme.palette.background.dark,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		backgroundColor: theme.palette.background.dark,
		width: drawerWidth,
	},
	toolbarAppBar: {
		display: "flex",
		justifyContent: "center",
	},
	toolbarImg: {
		width: "50%",
	},
	toolbarList: {
		display: "flex",
	},
	toolbarItem: {
		marginRight: "1rem",
		display: "flex",
		flexDirection: "column",
		whiteSpace: "nowrap",
		backgroundColor: theme.palette.background.default,
		borderRadius: "1rem",
	},
	toolbarItemText: {
		color: theme.palette.text.light,
		fontWeight: 600,
		fontSize: "1.6rem",
	},
	toolbar: {
		textAlign: "center",
		padding: "1rem",
	},
	dividerList: {
		background: theme.palette.text.dark,
	},
	drawerList: {
		alignSelf: "center",
		width: "100%",
		padding: "0",
	},
	drawerItem: {
		justifyContent: "flex-start",
		padding: "0",
		width: "inherit",
	},
	drawerLink: {
		display: "flex",
		alignItems: "center",
		color: theme.palette.text.main,
		textDecoration: "none !important",
		padding: "1.5rem",
		transition: ".7s",
		cursor: "pointer",
		width: "inherit",
		"&:hover": {
			backgroundColor: theme.palette.background.default,
			color: theme.palette.secondary.main,
		},
	},
	drawerLinkText: {
		fontSize: "2rem",
		fontWeight: 600,
	},
	drawerIcon: {
		marginRight: ".5rem",
		fontSize: "3rem",
	},
}));

export default function Header({ changePage }) {
	const [boolean, setBoolean] = React.useState(false);
  
	const [metas, setMetas] = React.useState([]);
	const idu=localStorage.getItem("id");
  
	const getMetas = () => {
	  if (!boolean) {
		Service.postData("user/get_userm", {id:idu}).then((res) =>{
			setMetas(res);
		})
		setBoolean(true);
	  }
	};

	const classes = useStyles();

	getMetas();
	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolbarAppBar}>
				{metas &&
					metas.map((meta) => {
						if(meta.tipo_usuario==="0"){
							return (
								<List className={classes.toolbarList}>
									<ListItem className={classes.toolbarItem}>
										<Typography className={classes.toolbarItemText} variant="h5">
											Total de ventas por cumplir
										</Typography>
										<Typography className={classes.toolbarItemText} variant="body2">
											{meta.metas_mes}
										</Typography>
									</ListItem>
									<ListItem className={classes.toolbarItem}>
										<Typography className={classes.toolbarItemText} variant="h5">
											Total de dinero por facturar
										</Typography>
										<Typography className={classes.toolbarItemText} variant="body2">
											{meta.metas_dinero}
										</Typography>
									</ListItem>
								</List>
							);
						}else{
							return (
								<List className={classes.toolbarList}>
									<ListItem className={classes.toolbarItem}>
										<Typography className={classes.toolbarItemText} variant="h5">
											Bienvenido
										</Typography>
										<Typography className={classes.toolbarItemText} variant="body2">
											{meta.nombre_completo}
										</Typography>
									</ListItem>
								</List>
							);
						}
					})}
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
				anchor="left"
			>
				<div className={classes.toolbar}>
					<img
						className={classes.toolbarImg}
						src="https://firebasestorage.googleapis.com/v0/b/erp-cni.appspot.com/o/icons%2Flogo-white.png?alt=media&token=6a4a04ad-7422-4621-86f8-0ec3b9f3aac8"
						alt="Logo CNI"
					/>
				</div>
				<Divider className={classes.dividerList} />
				<List className={classes.drawerList}>
					<ListItem className={classes.drawerItem}>
						<Link className={classes.drawerLink} onClick={() => changePage("dashboard")}>
							<DashboardIcon className={classes.drawerIcon} />
							<Typography className={classes.drawerLinkText} variant="h5">
								Tablero
							</Typography>
						</Link>
					</ListItem>
					<ListItem className={classes.drawerItem}>
						<Link className={classes.drawerLink} onClick={() => changePage("leads")}>
							<PeopleAltIcon className={classes.drawerIcon} />
							<Typography className={classes.drawerLinkText} variant="body2">
								Leads
							</Typography>
						</Link>
					</ListItem>
					<ListItem className={classes.drawerItem}>
						<Link className={classes.drawerLink} onClick={() => changePage("kpis")}>
							<EqualizerIcon className={classes.drawerIcon} />
							<Typography className={classes.drawerLinkText} variant="body2">
								Estadísticas
							</Typography>
						</Link>
					</ListItem>
					<ListItem className={classes.drawerItem}>
						<Link className={classes.drawerLink} onClick={() => changePage("products")}>
							<LoyaltyIcon className={classes.drawerIcon} />
							<Typography className={classes.drawerLinkText} variant="body2">
								Productos
							</Typography>
						</Link>
					</ListItem>
					{metas &&
						metas.map((meta) => {
							if(meta.tipo_usuario==="1"){
								return (
								<ListItem className={classes.drawerItem}>
									<Link className={classes.drawerLink} onClick={() => changePage("usuario")}>
										<PeopleAltIcon className={classes.drawerIcon} />
										<Typography className={classes.drawerLinkText} variant="body2">
											Usuarios
										</Typography>
									</Link>
								</ListItem>
								);
							}
					})}
				</List>
				<Divider className={classes.dividerList} />
				<List className={classes.drawerList}>
					<ListItem className={classes.drawerItem}>
						<Link className={classes.drawerLink} onClick={() => changePage("settings")}>
							<SettingsIcon className={classes.drawerIcon} />
							<Typography className={classes.drawerLinkText} variant="body2">
								Ajustes
							</Typography>
						</Link>
					</ListItem>
				</List>
			</Drawer>
		</div>
	);
}
