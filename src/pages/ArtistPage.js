import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import useMediaQuerry from "@mui/material/useMediaQuery";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getArtist } from "../store/actions/setsActions";
import Card from "../components/Card";
import Loading from "../components/Loading";

const useStyles = makeStyles(theme => ({
	cardsWrapper: {
		marginTop: "2em",
		maxWidth: "90em",
	},
}));

export default function ArtistPage({ pokemonCardArtist, setPokemonCardDetails }) {
	const classes = useStyles();
	const theme = useTheme();

	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);

	// useEffect(() => {
	// 	dispatch(getArtist(pokemonCardArtist));
	// }, []);

	return data ? (
		<Grid container justifyContent="center" alignItems="center" direction="column">
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
		<Loading />
	);
}
