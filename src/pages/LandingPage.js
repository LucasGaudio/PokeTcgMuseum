import React, { useEffect } from "react";
import PokemonForm from "../components/PokemonForm";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getRandomCard } from "../store/actions/setsActions";

import pokemon from "pokemontcgsdk";
import CardsLandingPage from "../components/CardsLandingPage";
import Loading from "../components/Loading";

const useStyles = makeStyles({
	container: {
		height: "88vh",
	},
	cardWrapper: {
		width: 380,
	},
});

export default function LandingPage({ setPokemonCardDetails }) {
	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);

	useEffect(() => {
		dispatch(getRandomCard(6));
	}, []);

	const classes = useStyles();

	const handleCards = (firstIndex, secondIndex) => {
		return (
			<Grid item>
				<Grid
					item
					container
					justifyContent="space-between"
					alignItems="center"
					className={classes.cardWrapper}
				>
					<CardsLandingPage
						data={data[firstIndex]}
						onClickFunction={setPokemonCardDetails}
						isEven
					/>

					<CardsLandingPage
						data={data[secondIndex]}
						onClickFunction={setPokemonCardDetails}
					/>
				</Grid>
			</Grid>
		);
	};

	return data ? (
		<Grid
			container
			alignItems="center"
			justifyContent="space-evenly"
			className={classes.container}
		>
			<Grid item>
				<Grid item container direction="column" alignItems="center" justifyContent="center">
					<Typography variant="detailValue">Poke TCG Museum</Typography>
					<Typography>Go through the Pokémon TCG History </Typography>
					<Grid item>
						<PokemonForm />
					</Grid>
				</Grid>
			</Grid>

			<Grid item>
				<Grid
					item
					container
					direction="column"
					justifyContent="center"
					alignItems="center"
					className={classes.cardsWrapper}
				>
					{handleCards(0, 1)}
					{handleCards(2, 3)}
					{handleCards(4, 5)}
				</Grid>
			</Grid>
		</Grid>
	) : (
		<Loading />
	);
}
