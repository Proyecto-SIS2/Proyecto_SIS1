import { createTheme } from "@material-ui/core/styles";

const font = "'Roboto', sans-serif";

const theme = createTheme({
	palette: {
		primary: {
			main: "#1c2b4c",
		},
		secondary: {
			main: "#70c292",
			red: "#ff0000",
		},
		background: {
			default: "#dae3e5",
		},
		text: {
			primary: "#04080f",
			light: "#dae3e5",
		},
	},
	typography: {
		fontFamily: font,
		htmlFontSize: 10,
	},
});

export default theme;
