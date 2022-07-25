import React from "react";
import { makeStyles, useTheme } from "@mui/styles";
import useMediaQuerry from "@mui/material/useMediaQuery";
import { Grid, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();
const useStyles = makeStyles(() => ({
	footer: {
		// backgroundColor: "#691B07",
		// bottom: 0,
		// width: "100%",
		// position: "absolute",
		// marginTop: "auto",
		// zIndex: "-1",
		// [theme.breakpoints.down("md")]: {
		// 	display: "block",
		// 	bottom: "auto",
		// },
	},
	footerContent: {
		padding: "3rem",
		width: "100%",
		[theme.breakpoints.down("md")]: {
			padding: "1rem",
		},
	},
	footerText: {
		[theme.breakpoints.down("md")]: {
			width: "inherit",
			textAlign: "center",
		},
	},
}));

export default function () {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<footer className={classes.footer}>
			<Grid
				item
				container
				direction="column"
				alignItems="center"
				justifyContent="flex-end"
				className={classes.footerContent}
			>
				<Typography variant="footerText" className={classes.footerText}>
					Poke TCG Museum by{" "}
					<a
						href="https://www.linkedin.com/in/lucas-gaudio-09698aa5/"
						title="linkedin"
						target="_blank"
						style={{ color: "#485fc7" }}
					>
						Lucas Gaudio
					</a>
				</Typography>
				<Typography variant="footerText" className={classes.footerText}>
					All data made available by the{" "}
					<a
						href="https://pokemontcg.io/"
						title="pokemon tcg api documentation"
						target="_blank"
						style={{ color: "#485fc7" }}
					>
						Pokémon TCG API
					</a>
				</Typography>
				<Typography variant="footerText" className={classes.footerText}>
					This website is not produced, endorsed, supported, or affiliated with Nintendo
					or The Pokémon Company.
				</Typography>
			</Grid>
		</footer>
	);
}
