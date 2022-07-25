import React from "react";
import { makeStyles, useTheme } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import backgroundImage from "../assets/images/frame.png";

const theme = createTheme();
const useStyles = makeStyles(() => ({
	cardWrapper: {
		padding: 20,
		maxWidth: "100%",
	},
	cardDiv: {
		flex: "none",
		margin: "16px 0",
	},
	cardAnchor: {
		cursor: "pointer",
		textDecoration: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	cardImage: {
		width: "100%",
		height: "auto",
		borderRadius: 10,
		display: "inline",
		cursor: "pointer",
		boxShadow: "5px 5px 6px rgb(0 0 0 / 45%)",
		transition: "all .2s ease-out",
		maxWidth: "249.6px",
		maxHeight: "348.4px",
		"&:hover": {
			transition: "all .2s ease-in-out",
			transform: "scale(1.1)",
		},
	},
	moveCardEven: {
		width: "100px",
	},

	moveCardOdd: {
		width: "99px",
	},
}));

export default function CardsLandingPage({ data, path, onClickFunction, isEven, index }) {
	const classes = useStyles();
	const theme = useTheme();

	const evenOrOdd = isEven ? "landingPageCardEven" : "landingPageCardOdd";
	const rowIndex = index === 0 || index === 1 ? "landingPageCardUp" : "landingPageCardDown";

	return data ? (
		<Grid
			item
			className={classes.cardWrapper}
			component={Link}
			variant="contained"
			to={`card/${data.name.toLowerCase()}/${data.id}`}
			onClick={() => onClickFunction(data)}
			onAuxClick={() => onClickFunction(data)}
		>
			<div className={classes.cardDiv}>
				<div className={classes.cardAnchor} alt={data.id}>
					<img
						className={`landingPageCard ${evenOrOdd} ${rowIndex}`}
						src={data.images.small}
						alt={data.name}
					/>
				</div>
			</div>
		</Grid>
	) : (
		<></>
	);
}
