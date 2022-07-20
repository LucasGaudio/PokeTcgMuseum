import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import useMediaQuerry from "@mui/material/useMediaQuery";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getAllCardsWithSameName } from "../store/actions/setsActions";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();
const useStyles = makeStyles(() => ({
	container: {
		minHeight: "85vh",
		marginBottom: "10%",
		[theme.breakpoints.down("md")]: {
			marginBottom: "75%",
		},
	},
	cardsWrapper: {
		marginTop: "2em",
		maxWidth: "90em",
	},
}));

export default function SearchCardPage({ cardName, setPokemonCardDetails }) {
	const classes = useStyles();
	const theme = useTheme();

	const { data, error } = useSelector(state => state.pokedex);

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
