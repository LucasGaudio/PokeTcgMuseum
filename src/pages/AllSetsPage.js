import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";

import { Grid, Typography, Card, CardContent, CardMedia } from "@mui/material";
import pokemon from "pokemontcgsdk";
import SingleSetCard from "../components/SingleSetCard";
import Loading from "../components/Loading";
import { createTheme } from "@mui/material/styles";

pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

const theme = createTheme();
const useStyles = makeStyles({
	cardWrapper: {
		marginTop: "2em",
		maxWidth: "101em",
		marginBottom: "15%",

		[theme.breakpoints.down("lg")]: {
			marginBottom: "0",
		},

		[theme.breakpoints.down("md")]: {
			marginBottom: "75%",
		},
	},
});

export default function AllSetsPage({ setPokemonSetData }) {
	const [pokemonSets, setPokemonSets] = useState(null);
	const [loading, setLoading] = useState(false);

	const classes = useStyles();

	useEffect(() => {
		setLoading(true);
		pokemon.set.all({ orderBy: "-releaseDate" }).then(sets => {
			setPokemonSets(sets);
			setLoading(false);
		});
	}, []);

	return loading ? (
		<Loading />
	) : (
		<Grid container direction="column" justifyContent="center" alignItems="center">
			<Grid item>
				<Grid
					item
					container
					justifyContent="center"
					alignItems="center"
					className={classes.cardWrapper}
				>
					{pokemonSets !== null &&
						pokemonSets.map(set => {
							return (
								<SingleSetCard
									key={set.id}
									set={set}
									setPokemonSetData={setPokemonSetData}
								/>
							);
						})}
				</Grid>
			</Grid>
		</Grid>
	);
}
