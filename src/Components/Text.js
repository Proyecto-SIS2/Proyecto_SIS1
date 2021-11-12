import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	text: {
		color: theme.palette.text.light,
		textAlign: "center",
	},
}));

export default function Text({ children }) {
	const classes = useStyles();

	return (
		<Typography className={classes.text} component="h4" variant="h4" gutterBottom>
			{children}
		</Typography>
	);
}
