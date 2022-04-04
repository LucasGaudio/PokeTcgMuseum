import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import { Grid, CircularProgress } from "@mui/material";
import Card from "../components/Card";
import pokemon from "pokemontcgsdk";

import { getSet } from "../store/actions/setsActions";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";

pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

const useStyles = makeStyles(theme => ({
	cardsWrapper: {
		marginTop: "2em",
		maxWidth: "90em",
	},
	setLogo: {
		maxHeight: 111,
		maxWidth: 268,
	},
}));

export default function SetCards({ pokemonSetData, setPokemonCardDetails }) {
	const classes = useStyles();
	const theme = useTheme();

	// const [pokemonCards, setPokemonCards] = useState([]);

	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);

	const [pokemonCards, setPokemonCards] = useState(() => {
		const storageCountry = localStorage.getItem("@Sets:set");
		if (storageCountry) {
			return JSON.parse(storageCountry);
		} else {
			return [];
		}
	});

	console.log("pokemonCards Test", pokemonCards);

	// const matchesMD = useMediaQuery(theme => theme.breakpoints.down("sm"));
	console.log("pokemonCards", data);
	return data ? (
		<Grid container justifyContent="center" alignItems="center" direction="column">
			<Grid item>
				<img src={data[0].set.images.logo} alt={"Set logo"} className={classes.setLogo} />
			</Grid>
			<Grid item>
				<Grid
					item
					container
					justifyContent="center"
					alignItems="center"
					className={classes.cardsWrapper}
				>
					{data !== null &&
						data.map(card => {
							return (
								<div key={card.id}>
									<Card
										data={card}
										path="card"
										onClickFunction={setPokemonCardDetails}
									/>
								</div>
							);
						})}
				</Grid>
			</Grid>
		</Grid>
	) : (
		<Grid item container justifyContent="center" alignItems="center" style={{ height: "90vh" }}>
			<CircularProgress />
		</Grid>
	);
}
