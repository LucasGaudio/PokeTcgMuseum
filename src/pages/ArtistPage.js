import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import useMediaQuerry from "@mui/material/useMediaQuery";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getArtist } from "../store/actions/setsActions";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();
const useStyles = makeStyles(() => ({
	container: {
		minHeight: "85vh",
	},
	cardsWrapper: {
		marginTop: "2em",
		maxWidth: "90em",
		marginBottom: "15%",
		[theme.breakpoints.down("md")]: {
			marginBottom: "75%",
		},
	},
}));

export default function ArtistPage({ pokemonCardArtist, setPokemonCardDetails }) {
	const classes = useStyles();
	const theme = useTheme();

	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);

	useEffect(() => {
		// if (!data) {
		const currentUrl = window.location.href;
		const lastWord = currentUrl.split("/").pop();
		dispatch(getArtist(lastWord));
		// }
	}, []);

	// useEffect(() => {
	// 	dispatch(getArtist(pokemonCardArtist));
	// }, []);

	return data ? (
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			direction="column"
			className={classes.container}
		>
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
								<Card
									key={card.id}
									data={card}
									path="card"
									onClickFunction={setPokemonCardDetails}
								/>
							);
						})}
				</Grid>
			</Grid>
		</Grid>
	) : (
		<Loading />
	);
}
