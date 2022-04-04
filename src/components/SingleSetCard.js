import React from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Grid, Typography, Card } from "@mui/material";
import pokemon from "pokemontcgsdk";
import dayjs from "dayjs";
import { getSet } from "../store/actions/setsActions";

pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

const useStyles = makeStyles(theme => ({
	setWrapper: {
		textDecoration: "none",
		padding: 10,
		transition: "all .2s ease-out",
		"&:hover": {
			transition: "all .2s ease-in-out",
			transform: "scale(1.1)",
		},
	},
	setCard: {
		width: "28em",
		height: "20.5em",
		margin: "0.75rem",
		borderRadius: 5,
		backgroundColor: "#252F3F",
	},
	setImageWrapper: {
		textAlign: "center",
		height: 140,
		paddingTop: 15,
		alignItems: "center",
		justifyContent: "center",
		textDecoration: "none",
	},
	setImage: {
		maxWidth: "80%",
		maxHeight: "100%",
	},
	setImageSymbolWrapper: {
		marginRight: "1rem",
		width: "6em",
	},
	setImageSymbolFigure: {
		height: "3em",
		width: "3em",
	},
	setImageSymbol: {
		maxWidth: "100%",
	},
	setTextWrapper: {
		padding: "1.5rem",
	},
	setTitle: {
		color: "#c9d1d9",
		fontSize: "1.5rem",
		maxWidth: "10em",
	},
	setReleased: {
		color: "#818a93",
		fontSize: "1rem",
	},
	setText: {
		color: "#fff",
		fontSize: "0.95rem",
		fontWeight: 800,
		fontFamily: "Nunito Sans",
	},
	setExtraText: {
		fontSize: "0.85rem",
		marginBottom: "0.5em",
	},
	setSpan: {
		fontWeight: 400,
	},
	formatUl: {
		marginLeft: "2em",
		marginTop: "1em",
		color: "#c9d1d9",
		fontFamily: "ubuntu,sans-serif",
	},
}));

export default function SingleSetCard({ set, setPokemonSetData }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const formats = Object.entries(set.legalities).slice(1);

	const setReleaseDate = dayjs(set.releaseDate).format("MM/DD/YYYY");
	return (
		<Grid
			item
			alignItems="center"
			justifyContent="center"
			className={classes.setWrapper}
			component={Link}
			variant="contained"
			to={`/set/${set.id}`}
			onClick={() => dispatch(getSet(set.id))}
			onAuxClick={() => dispatch(getSet(set.id))}
			key={set.id}
		>
			<Card className={classes.setCard}>
				<Grid
					item
					container
					direction="column"
					justifyContent="center"
					alignItems="center"
					style={{}}
					className={classes.setImageWrapper}
				>
					<img src={set.images.logo} alt={set.id} className={classes.setImage} />
				</Grid>
				<Grid item container className={classes.setTextWrapper}>
					<Grid item container>
						<Grid item className={classes.setImageSymbolWrapper}>
							<figure className={classes.setImageSymbolFigure}>
								<img
									src={set.images.symbol}
									alt={set.id}
									className={classes.setImageSymbol}
								/>
							</figure>
						</Grid>
						<Grid item>
							<Typography className={classes.setTitle}>{set.name}</Typography>
							<Typography className={classes.setReleased}>
								{setReleaseDate}
							</Typography>
						</Grid>
					</Grid>
					<Grid item container>
						<Grid item>
							<ul className={classes.formatUl}>
								{formats.map(format => {
									return <li key={format[0]}>{`${format[0]}: ${format[1]}`} </li>;
								})}
							</ul>
						</Grid>
					</Grid>
				</Grid>
			</Card>
		</Grid>
	);
}
