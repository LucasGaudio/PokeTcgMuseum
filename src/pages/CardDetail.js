import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { Grid, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { getAllCardsWithSameName, getSet, getArtist } from "../store/actions/setsActions";
import { createTheme } from "@mui/material/styles";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import allPokemonNameData from "../assets/json/allPokemonNames.json";

import defaultCardImage from "../assets/images/card_back_side.png";

const theme = createTheme();
const useStyles = makeStyles(() => ({
	cardImageContainer: {
		perspective: 1000,
	},
	cardImage: {
		width: "65%",
		borderRadius: 21,
		display: "inline",
		boxShadow: "5px 5px 6px rgb(0 0 0 / 45%)",
		[theme.breakpoints.down("lg")]: {
			width: "65%",
		},
		[theme.breakpoints.down("md")]: {
			width: "80%",
		},
	},

	cardInner: {
		transition: "transform 1s",
		transformStyle: "preserve-3d",
		position: "relative",
	},
	cardImageBack: {
		transform: "rotateY(180deg)",
		backfaceVisibility: "hidden",
		overflow: "hidden",
		position: "absolute",
		// width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},

	cardImageFront: {
		backfaceVisibility: "hidden",
		overflow: "hidden",
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},

	cardInnerFlip: {
		transition: "transform 1s",
		transformStyle: "preserve-3d",
		position: "relative",
		transform: "rotateY(180deg)",
	},

	blockWrapper: {
		width: "665px",
		[theme.breakpoints.down("md")]: {
			width: "auto",
		},
	},
	typeImage: {
		width: "1.6em",
		marginRight: "0.25em",
	},
	detailWrapper: {
		marginBottom: 20,
		[theme.breakpoints.down("md")]: {
			marginBottom: 0,
			padding: 15,
		},
	},
	abilitieImage: {
		marginRight: 20,
		width: 111,
	},
	detailTitle: {
		marginBottom: 10,
		[theme.breakpoints.down("md")]: {
			textAlign: "center",
		},
	},
	detailText: {
		marginLeft: 4,
	},
	ruleText: {
		marginBottom: "1em",
	},
	line: {
		margin: "1.5rem 0",
		width: "100%",
	},
	anchor: {
		color: "#485fc7",
		"&:hover": {
			color: "#824c95",
		},
	},
	setText: {
		maxWidth: 180,
	},
	setSymbolImage: {
		width: 26,
		marginLeft: 5,
		marginTop: 2,
	},
	detailSize: {
		// width: "33.3%",
		width: 142.3,
	},
}));

export default function CardDetail({
	pokemonCardDetails,
	setPokemonCardArtist,
	setPokemonSetData,
	setCardName,
}) {
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));

	const [onlyThePokemonName, setOnlyThePokemonName] = useState(pokemonCardDetails.name);
	const [flipCard, setFlipCard] = useState(false);

	const fixedCardName = pokemonCardDetails.name.toLowerCase();

	console.log("onlyThePokemonName", onlyThePokemonName.toLowerCase().replace(/ /g, "+"));

	const dispatch = useDispatch();

	let specificPokemonNamesArray = [];
	console.log("pokemonCardDetails", pokemonCardDetails);

	//TODO inves de pegar o removedpokemonNameList, pegar direto o nome do pokemon da lista
	// console.log("data", allPokemonNameData[pokemonCardDetails.nationalPokedexNumbers]);
	const removedpokemonNameList = [
		"Rapid Strike ",
		"Single Strike ",
		"Radiant",
		"Dark ",
		"Light ",
		"Shining ",
		"Brock's ",
		"Misty's ",
		"Lt. Surge's ",
		"Erika's ",
		"Koga's ",
		"Sabrina's ",
		"Blaine's ",
		"Giovanni's ",
		"Rocket's ",
		"Team Magma's ",
		"Team Aqua's ",
		"M ",
		"White ",
		"Black ",
		"Detective ",
		" δ",
		" Star",
		" ex",
		"-EX",
		"-GX",
		"VMAX",
		"VSTAR",
		"V-UNION",
		" V",
		" GL",
		" G",
		"LV.X",
		" E4",
		" FB",
		" ◇",
		" LEGEND",
	];

	const searchCardName = e => {
		console.log("e", e);
		console.log(
			"allPokemonNameData[e - 1].name.toLocaleLowerCase()",
			allPokemonNameData[e - 1].name.toLocaleLowerCase()
		);

		return allPokemonNameData[e - 1].name.toLocaleLowerCase();
	};

	const handlesetSpecificPokemonName = i => {
		specificPokemonNamesArray.push(i);
	};

	const handleRemovedpokemonName = () => {
		removedpokemonNameList.map(
			i => pokemonCardDetails.name.includes(i) && handlesetSpecificPokemonName(i)
		);
	};

	const changePokemonName = () => {
		let cardName = pokemonCardDetails.name;

		console.log("cardName", cardName);
		// let newPokemonName = cardName.replace(
		//  specificPokemonNamesArray.map(i => i),
		//  ""
		// );
		let newPokemonName;
		if (specificPokemonNamesArray.length === 1) {
			newPokemonName = cardName.replace(specificPokemonNamesArray[0], "");
			setOnlyThePokemonName(newPokemonName);
		} else if (specificPokemonNamesArray.length === 2) {
			newPokemonName = cardName
				.replace(specificPokemonNamesArray[0], "")
				.replace(specificPokemonNamesArray[1], "");
			setOnlyThePokemonName(newPokemonName);
		} else if (specificPokemonNamesArray.length === 3) {
			newPokemonName = cardName
				.replace(specificPokemonNamesArray[0], "")
				.replace(specificPokemonNamesArray[1], "")
				.replace(specificPokemonNamesArray[2], "");
			setOnlyThePokemonName(newPokemonName);
		}
		// let cardName = "Single Strike Urshifu V";
		// let removed = "Single Strike V";
		// specificPokemonNamesArray.map(specificPokemonName => {
		//  let newPokemonName = cardName.replaceAll(specificPokemonName, "");
		//  // let newPokemonName = cardName.replaceAll(removed, "");

		//  setOnlyThePokemonName(newPokemonName);
		//  console.log("entrou", newPokemonName);
		// });

		// cardName.replace(removed, "");

		// specificPokemonNames.forEach(specificPokemonName => {
		//  console.log("specificPokemonName", specificPokemonName);
		//  let newPokemonName = pokemonCardDetails.name.replace(specificPokemonName, "");
		//  setOnlyThePokemonName(newPokemonName);
		// });
	};

	// useEffect(() => {
	// 	if (pokemonCardDetails.supertype === "Pokémon") {
	// 		try {
	// 			handleRemovedpokemonName();
	// 		} finally {
	// 			changePokemonName();
	// 		}
	// 	}
	// }, []);

	const importAllPokemonTypeImages = pokemonTypeImages => {
		let images = {};
		pokemonTypeImages.keys().forEach((item, index) => {
			images[item.replace("./", "")] = pokemonTypeImages(item);
		});
		return images;
	};

	const images = importAllPokemonTypeImages(
		require.context("../assets/images/pokemonTypes", false, /\.(png|jpe?g|svg)$/)
	);

	const handleSearchCardName = cardFinalName => {
		dispatch(getAllCardsWithSameName(cardFinalName));
	};

	const handleSearchSet = setName => {
		dispatch(getSet(setName));
	};

	const handleSearchArtist = artistName => {
		dispatch(getArtist(artistName));
	};

	const handleAbilities = () => {
		return (
			<>
				{pokemonCardDetails.abilities &&
					pokemonCardDetails.abilities.map(abilitie => (
						<Grid
							item
							container
							direction="column"
							key={abilitie.name}
							className={classes.detailWrapper}
						>
							<Grid item>
								<Grid
									item
									container
									className={classes.detailTitle}
									alignItems="center"
								>
									<img
										src={images[`${abilitie.type}.png`].default}
										alt={pokemonCardDetails.types[0]}
										className={classes.abilitieImage}
									/>
									<Typography variant="cardDetailTitle">
										{abilitie.name}
									</Typography>
								</Grid>
							</Grid>
							<Grid item>
								<Typography variant="p">{abilitie.text}</Typography>
							</Grid>
						</Grid>
					))}
			</>
		);
	};

	const handleAttack = () => {
		return (
			pokemonCardDetails.attacks &&
			pokemonCardDetails.attacks.map(attack => (
				<Grid
					item
					container
					direction="column"
					key={attack.name}
					className={classes.detailWrapper}
				>
					<Typography variant="detailTitle">ATTACKS</Typography>

					<Grid item className={classes.detailTitle}>
						<Grid item container justifyContent="space-between">
							<Grid item>
								<Grid item container alignItems="center">
									{attack.cost.map((cost, index) => {
										return (
											<img
												src={images[`${cost}.png`].default}
												alt={cost}
												className={classes.typeImage}
												key={cost + index}
											/>
										);
									})}
									<Typography variant="cardDetailTitle" sx={{ marginLeft: 2 }}>
										{attack.name}
									</Typography>
								</Grid>
							</Grid>
							<Typography variant="cardDetailTitle">{attack.damage}</Typography>
						</Grid>
					</Grid>
					<Grid item sx={{ maxWidth: "93% !important" }}>
						<Typography variant="p">{attack.text}</Typography>
					</Grid>
				</Grid>
			))
		);
	};

	const handleWeaknessResistance = (title, value) => {
		return (
			<Grid item className={classes.detailSize}>
				<Grid item container direction="column">
					<Typography variant="detailTitle">{title}</Typography>
					<Grid item>
						{value ? (
							<Grid item container>
								<img
									src={images[`${value.type}.png`].default}
									alt={value.type}
									className={classes.typeImage}
								/>
								<Typography variant="detailValue" className={classes.detailText}>
									{value.value}
								</Typography>
							</Grid>
						) : (
							<Typography variant="detailValue">N/A</Typography>
						)}
					</Grid>
				</Grid>
			</Grid>
		);
	};

	const handleRetreatCost = () => {
		return (
			<Grid item className={classes.detailSize} style={{ marginTop: matches ? 20 : 0 }}>
				<Grid item container direction="column">
					<Typography variant="detailTitle">RETREAT COST</Typography>
					<Grid item>
						{pokemonCardDetails.retreatCost ? (
							pokemonCardDetails.retreatCost.map((cost, index) => {
								return (
									<img
										src={images[`${cost}.png`].default}
										alt={cost}
										className={classes.typeImage}
										key={cost + index}
									/>
								);
							})
						) : (
							<Typography variant="detailValue">N/A</Typography>
						)}
					</Grid>
				</Grid>
			</Grid>
		);
	};

	const handleRules = () => {
		return (
			<>
				{pokemonCardDetails.rules && (
					<Grid item container direction="column" className={classes.detailWrapper}>
						<Typography variant="detailTitle">RULES</Typography>
						{pokemonCardDetails.rules.map(rule => (
							<Typography key={rule} variant="p" className={classes.ruleText}>
								{rule}
							</Typography>
						))}
					</Grid>
				)}
			</>
		);
	};

	const handleArtist = () => {
		return (
			<Grid item className={classes.detailSize}>
				<Grid item container direction="column">
					<Typography variant="detailTitle">ARTIST</Typography>
					<Grid
						item
						component={Link}
						to={`/artist/${pokemonCardDetails.artist}`}
						sx={{ color: "#1A202C" }}
						onClick={() => {
							handleSearchArtist(pokemonCardDetails.artist);
						}}
					>
						<Typography variant="detailValue" className={classes.anchor}>
							{pokemonCardDetails.artist}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		);
	};

	const handleRarity = () => {
		return (
			<Grid item className={classes.detailSize}>
				<Grid item container direction="column">
					<Typography variant="detailTitle">RARITY</Typography>
					<Typography variant="detailValue">{pokemonCardDetails.rarity}</Typography>
				</Grid>
			</Grid>
		);
	};

	const handleSet = () => {
		return (
			<Grid item className={classes.detailSize}>
				<Grid item container direction="column">
					<Typography variant="detailTitle">SET</Typography>
					<Grid
						item
						component={Link}
						to={`/set/${pokemonCardDetails.set.id}`}
						sx={{ color: "#1A202C" }}
						onClick={() => {
							// setPokemonSetData(pokemonCardDetails.set);
							//TODO revisar porque pode não estar perfeito
							handleSearchSet(pokemonCardDetails.set.id);
						}}
					>
						<Typography
							variant="detailValue"
							className={classes.anchor}
							style={{ maxWidth: 20 }}
						>
							{pokemonCardDetails.set.name}
						</Typography>
						<img
							className={classes.setSymbolImage}
							src={pokemonCardDetails.set.images.symbol}
							alt="Set symbol image"
						/>
					</Grid>
				</Grid>
			</Grid>
		);
	};

	const handleNumber = () => {
		return (
			<Grid item style={{ marginBottom: matches && !pokemonCardDetails.flavorText ? 80 : 0 }}>
				<Grid item container direction="column">
					<Typography variant="detailTitle">NUMBER</Typography>
					<Typography variant="detailValue">
						{pokemonCardDetails.number} / {pokemonCardDetails.set.printedTotal}
					</Typography>
				</Grid>
			</Grid>
		);
	};

	const handleFlavorText = () => {
		return (
			pokemonCardDetails.flavorText && (
				<Grid item style={{ marginBottom: matches ? 80 : 0 }}>
					<hr className={classes.line} />
					<Grid item sx={{ marginTop: "20px" }}>
						<Typography variant="p">{pokemonCardDetails.flavorText}</Typography>
					</Grid>
				</Grid>
			)
		);
	};

	const handleSupertypePokemon = () => {
		return (
			<>
				{handleAbilities()}
				{handleAttack()}
				<Grid
					item
					container
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					className={classes.detailWrapper}
					// spacing={12}
				>
					{handleWeaknessResistance(
						"WEAKNESS",
						pokemonCardDetails.weaknesses ? pokemonCardDetails.weaknesses[0] : null
					)}
					{handleWeaknessResistance(
						"RESISTANCE",
						pokemonCardDetails.resistances ? pokemonCardDetails.resistances[0] : null
					)}
					{handleRetreatCost()}
				</Grid>
				{handleRules()}
				<Grid
					item
					container
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					className={classes.detailWrapper}
				>
					{handleArtist()}
					{handleRarity()}
					{handleSet()}
				</Grid>
				<Grid item className={classes.detailWrapper}>
					{handleNumber()}
					{handleFlavorText()}
				</Grid>
			</>
		);
	};

	const handleSupertypeTrainer = () => {
		return (
			<>
				{handleRules()}
				<Grid
					item
					container
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					className={classes.detailWrapper}
				>
					{handleArtist()}
					{handleRarity()}
					{handleSet()}
				</Grid>
				<Grid item className={classes.detailWrapper}>
					{handleNumber()}
				</Grid>
			</>
		);
	};

	const handleSupertypeEnergy = () => {
		return (
			<>
				{handleRules()}
				<Grid
					item
					container
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					className={classes.detailWrapper}
				>
					{handleRarity()}
					{handleSet()}
					{handleNumber()}
				</Grid>
			</>
		);
	};

	const displayCardDetail = () => {
		if (pokemonCardDetails.supertype === "Pokémon") {
			return handleSupertypePokemon();
		} else if (pokemonCardDetails.supertype === "Trainer") {
			return handleSupertypeTrainer();
		} else if (pokemonCardDetails.supertype === "Energy") {
			return handleSupertypeEnergy();
		}
	};

	return (
		<Grid
			container
			direction={matches ? "column" : "row"}
			justifyContent="center"
			alignItems="center"
		>
			<Grid item>
				<Grid item container justifyContent="center">
					<Zoom overlayBgColorEnd="rgba(255, 255, 255, 0.5)">
						<Grid
							item
							container
							justifyContent="center"
							style={{
								marginBottom: 15,
							}}
						>
							<div className={classes.cardImageContainer}>
								<div
									style={{
										display: !flipCard ? "flex" : "none",
										alignItems: "center",
										justifyContent: "center",
										width: matches ? "auto" : 734,
										height: flipCard ? 0 : "100%",
									}}
								>
									<img
										className={classes.cardImage}
										src={defaultCardImage}
										style={{
											borderRadius: "29px",
										}}
									/>
								</div>

								<div
									className={
										!flipCard ? classes.cardInnerFlip : classes.cardInner
									}
									style={{
										width: matches ? "auto" : 734,
										height: !flipCard ? 0 : "100%",
									}}
								>
									<div
										className={classes.cardImageBack}
										style={{ display: flipCard ? "flex" : "none" }}
									>
										<img
											className={classes.cardImage}
											src={defaultCardImage}
											style={{
												borderRadius: "29px",
											}}
										/>
									</div>
									<div className={classes.cardImageFront}>
										<img
											className={classes.cardImage}
											src={pokemonCardDetails.images.large}
											onLoad={() => setFlipCard(true)}
										/>
									</div>
								</div>
							</div>
						</Grid>
					</Zoom>
					<Grid item className={classes.blockWrapper}>
						<Grid
							item
							container
							direction={matches ? "column" : "row"}
							alignItems="center"
							justifyContent={matches ? "center" : "space-between"}
							style={{ padding: matches ? 15 : 0 }}
						>
							<Grid item>
								<Grid item container direction="column" sx={{ marginBottom: 2 }}>
									<Typography variant="cardName">
										{pokemonCardDetails.name}
									</Typography>
									{pokemonCardDetails.subtypes && (
										<Typography variant="h6">
											{`${pokemonCardDetails.supertype} - ${pokemonCardDetails.subtypes[0]}`}
										</Typography>
									)}
								</Grid>
							</Grid>
							<Grid item>
								{pokemonCardDetails.hp && (
									<Grid item container alignItems="center">
										<Typography
											variant="cardDetailTitle"
											sx={{ marginRight: "0.25em" }}
										>
											{`HP ${pokemonCardDetails.hp}`}
										</Typography>
										<Grid item>
											<img
												src={
													images[`${pokemonCardDetails.types[0]}.png`]
														.default
												}
												alt={pokemonCardDetails.types[0]}
												className={classes.typeImage}
											/>
										</Grid>
									</Grid>
								)}
								{pokemonCardDetails.supertype === "Pokémon" ? (
									pokemonCardDetails.nationalPokedexNumbers.map(e => (
										<Grid
											item
											component={Link}
											to={`/search/${allPokemonNameData[
												e - 1
											].name.toLocaleLowerCase()}`}
											sx={{ color: "#1A202C" }}
											onClick={() => {
												setCardName(
													allPokemonNameData[
														e - 1
													].name.toLocaleLowerCase()
												);
												handleSearchCardName(
													allPokemonNameData[
														e - 1
													].name.toLocaleLowerCase()
												);
											}}
										>
											<Typography variant="h6" className={classes.anchor}>
												Other {allPokemonNameData[e - 1].name} Cards
											</Typography>
										</Grid>
									))
								) : (
									<Grid
										item
										component={Link}
										to={`/search/${fixedCardName.split(" ").join(".")}`}
										sx={{ color: "#1A202C" }}
										onClick={() => {
											setCardName(fixedCardName.split(" ").join("."));
											handleSearchCardName(
												fixedCardName.split(" ").join(".")
											);
										}}
									>
										<Typography variant="h6" className={classes.anchor}>
											Other {pokemonCardDetails.name} Cards
										</Typography>
									</Grid>
								)}
							</Grid>

							<hr className={classes.line} />
						</Grid>
						<Grid item container>
							<Grid item sx={{ width: "100%" }}>
								{displayCardDetail()}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
