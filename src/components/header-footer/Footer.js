import React from "react";
import { makeStyles, useTheme } from "@mui/styles";
import useMediaQuerry from "@mui/material/useMediaQuery";
import { Grid, Typography } from "@mui/material";

const useStyles = makeStyles(theme => ({
	footer: {
		backgroundColor: "#161B22",
		bottom: 0,
		marginTop: "13.8rem",
		padding: "3rem 1.5rem 6rem",
	},
}));

export default function () {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<footer className={classes.footer}>
			<Grid item container direction="column" alignItems="center" justifyContent="flex-end">
				<Typography variant="footerText">
					Pokémon Card Collection by{" "}
					<a
						href="https://www.linkedin.com/in/lucas-gaudio-09698aa5/"
						title="linkedin"
						target="_blank"
					>
						Lucas Gaudio
					</a>
				</Typography>
				<Typography variant="footerText">
					All data made available by the{" "}
					<a
						href="https://pokemontcg.io/"
						title="pokemon tcg api documentation"
						target="_blank"
					>
						Pokémon TCG API
					</a>
				</Typography>
				<Typography variant="footerText">
					This website is not produced, endorsed, supported, or affiliated with Nintendo
					or The Pokémon Company.
				</Typography>
			</Grid>
		</footer>
	);
}
