import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	title: {
		color: theme.palette.text.light,
		fontWeight: "bold",
		textAlign: "center",
	},
}));

export default function Title({ children }) {
	const classes = useStyles();

	return (
		<Typography className={classes.title} component="h2" variant="h2" gutterBottom>
			{children}
		</Typography>
	);
}
