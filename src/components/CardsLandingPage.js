import React from "react";
import { makeStyles, useTheme } from "@mui/styles";
import useMediaQuerry from "@mui/material/useMediaQuery";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	cardsWrapper: {
		marginTop: "2em",
		maxWidth: "101em",
	},
	cardWrapper: {
		width: "20%",
	},
	cardDiv: {
		flex: "none",
		margin: "16px 0",
	},
	cardAnchor: {
		cursor: "pointer",
		textDecoration: "none",
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
}));

export default function CardsLandingPage({ data, path, onClickFunction, isEven }) {
	const classes = useStyles();
	const theme = useTheme();

	const evenOrOdd = isEven ? "Even" : "Odd";

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
						className={"moveCard" + evenOrOdd}
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
