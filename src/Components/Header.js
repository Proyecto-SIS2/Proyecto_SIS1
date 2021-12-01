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
import PostAddIcon from '@material-ui/icons/PostAdd';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from "@material-ui/icons/Settings";
import Service from "../Service";
import logo from '../Images/logo.png'

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
		color: theme.palette.text.primary,
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
  
	const [usuario, setUsuario] = React.useState([]);
	const idu=localStorage.getItem("id");
  
	const getUsuario = () => {
	  if (!boolean) {
		Service.postData("user/get_user", {id:idu}).then((res) =>{
			setUsuario(res);
		})
		setBoolean(true);
	  }
	};

	const classes = useStyles();

	getUsuario();
	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolbarAppBar}>
				{usuario &&
					usuario.map((u, uIdx) => {
						return (
							<List className={classes.toolbarList} key={uIdx}>
								<ListItem className={classes.toolbarItem}>
									<Typography className={classes.toolbarItemText} variant="h5">
										Bienvenido
									</Typography>
									<Typography className={classes.toolbarItemText} variant="body2">
										{u.nombre + " " + u.apellido}
									</Typography>
									
								</ListItem>
							</List>
						);
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
						src={logo}
						alt="Logo"
					/>
				</div>
				<Divider className={classes.dividerList} />
				<List className={classes.drawerList}>
					<ListItem className={classes.drawerItem}>
						<Link className={classes.drawerLink} onClick={() => changePage("factura")}>
							<PostAddIcon className={classes.drawerIcon} />
							<Typography className={classes.drawerLinkText} variant="h5">
								Crear Factura
							</Typography>
						</Link>
					</ListItem>
					<ListItem className={classes.drawerItem}>
						<Link className={classes.drawerLink} onClick={() => changePage("historial")}>
							<TimelineIcon className={classes.drawerIcon} />
							<Typography className={classes.drawerLinkText} variant="body2">
								Historial de Facturas
							</Typography>
						</Link>
					</ListItem>
				</List>
				<Divider className={classes.dividerList} />
				<List className={classes.drawerList}>
					<ListItem className={classes.drawerItem}>
						<Link className={classes.drawerLink} onClick={() => changePage("ajustes")}>
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
