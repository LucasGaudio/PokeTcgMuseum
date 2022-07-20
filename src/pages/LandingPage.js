import React, { useEffect } from "react";
import PokemonForm from "../components/PokemonForm";
import { Grid, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useDispatch, useSelector } from "react-redux";
import { getRandomCard } from "../store/actions/setsActions";

import pokemon from "pokemontcgsdk";
import CardsLandingPage from "../components/CardsLandingPage";
import Loading from "../components/Loading";

import backgroundImage from "../assets/images/frame.png";

const theme = createTheme();
const useStyles = makeStyles(() => ({
	container: {
		// minHeight: "85vh",
		minHeight: "60vh",
		[theme.breakpoints.down("md")]: {
			minHeight: "65vh",
		},
	},
	cardWrapper: {
		// width: 380,
		// padding: 20,
	},
	allCardsWrapper: {
		backgroundImage: `url(${backgroundImage})`,
		backgroundRepeat: "no-repeat",
		// backgroundAttachment: "fixed",
		backgroundSize: "contain",
		backgroundPosition: "center",
	},
	testColor: {
		color: theme.palette.primary.main,
	},
}));

export default function LandingPage({ setPokemonCardDetails }) {
	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);
	const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

	useEffect(() => {
		dispatch(getRandomCard(4));
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
						index={firstIndex}
					/>

					<CardsLandingPage
						data={data[secondIndex]}
						onClickFunction={setPokemonCardDetails}
						index={secondIndex}
					/>
				</Grid>
			</Grid>
		);
	};

	return data ? (
		<Grid
			container
			direction={matchesMd ? "column" : "row"}
			alignItems="center"
			justifyContent="space-evenly"
			className={classes.container}
		>
			<Grid item xs={6} style={{ minHeight: "100%" }}>
				<Grid item container direction="column" alignItems="center" justifyContent="center">
					<Typography variant="detailValue" className={classes.testColor}>
						Poke TCG Museum
					</Typography>
					<Typography className={classes.testColor}>
						Go through the Pokémon TCG History{" "}
					</Typography>
					<Grid item>
						<PokemonForm />
					</Grid>
				</Grid>
			</Grid>
			{!matchesMd && (
				<Grid item xs={6}>
					<Grid
						item
						container
						direction="column"
						justifyContent="center"
						alignItems="center"
						className={classes.allCardsWrapper}
					>
						{handleCards(0, 1)}
						{handleCards(2, 3)}
					</Grid>
				</Grid>
			)}
		</Grid>
	) : (
		<Loading />
	);
}
