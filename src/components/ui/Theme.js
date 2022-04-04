import { createTheme } from "@material-ui/core/styles";
//import { Typography } from '@material-ui/core';

const blueJeans = "#1CA7EC";
const staleBlue = "#797FF7";
const turquoise = "#4ADEDE";
const skyBlue = "#7ad6f4";
const black = "#00010F";
const white = "#ffffff";

export default createTheme({
	palette: {
		common: {
			blueJeans: `${blueJeans}`,
			staleBlue: `${staleBlue}`,
			turquoise: `${turquoise}`,
		},
		primary: {
			main: `${blueJeans}`,
		},
		secondary: {
			main: `${staleBlue}`,
		},
		info: {
			main: `${black}`,
		},
	},

	typography: {
		tab: {
			fontFamily: "sofia-pro, sans-serif",
			textTransform: "none",
			fontWeight: 700,
			color: "white",
			fontSize: "0.9rem",
		},
		estimate: {
			fontFamily: "sofia-pro, sans-serif",
			fontSize: "1rem",
			textTransform: "none",
			color: "white",
		},
		h2: {
			fontFamily: "sofia-pro, sans-serif",
			fontWeight: 500,
			fontSize: "2.5rem",
			color: `${blueJeans}`,
			lineHeight: 1.5,
		},
		h3: {
			fontFamily: "Pacifico",
			fontSize: "2.5rem",
			color: blueJeans,
		},
		h4: {
			fontFamily: "Cutive Mono",
			fontSize: "2.5rem",
			fontWeight: 700,
			lineHeight: 1.5,
			color: black,
		},
		h5: {
			fontFamily: "ubuntu, sans-serif",
			fontSize: "2.5rem",
			fontWeight: 700,
			lineHeight: 1.5,
			color: white,
		},
		h6: {
			fontFamily: "sofia-pro, sans-serif",
			fontSize: "1.2rem",
			lineHeight: 1.5,
			color: white,
		},
		cardName: {
			fontFamily: "ubuntu, sans-serif",
			color: "#c9d1d9",
			fontSize: "2rem",
			fontWeight: 600,
			lineHeight: 1.125,
		},
		cardDetailTitle: {
			fontFamily: "ubuntu, sans-serif",
			color: "#c9d1d9",
			fontSize: "1.5rem",
			lineHeight: 1.125,
		},
		p: {
			fontFamily: "ubuntu, sans-serif",
			color: "#c9d1d9",
			fontSize: "1rem",
			lineHeight: 1.5,
		},
		detailTitle: {
			fontSize: "0.9rem",
			fontFamily: "ubuntu, sans-serif",
			color: "#f0f6fc",
			letterSpacing: 1,
			marginBottom: 10,
		},
		detailValue: {
			fontSize: "1.25rem",
			fontFamily: "ubuntu, sans-serif",
			color: "#c9d1d9",
		},
		footerText: {
			fontSize: "1rem",
			fontFamily: "ubuntu, sans-serif",
			color: "#fff",
			marginBottom: "1em",
		},
	},

	overrides: {
		MuiInputLabel: {
			root: {
				color: blueJeans,
				fontSize: "1rem",
			},
		},
		MuiInput: {
			root: {
				color: skyBlue,
				fontWeight: 300,
			},
			underline: {
				"&:before": {
					borderBottom: `2px solid ${blueJeans}`,
				},
				"&:hover:not($disabled):not($focused):not($error):before": {
					borderBottom: `2px solid ${blueJeans}`,
				},
			},
		},
	},
});
