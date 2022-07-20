import React, { useState, useRef, useEffect } from "react";
import { TextField, Stack, useTheme } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import allPokemonNameData from "../assets/json/allPokemonNames.json";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCardsWithSameName } from "../store/actions/setsActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ClassNames } from "@emotion/react";

export default function PokemonForm({ header }) {
	const [inputText, setInputText] = useState("");
	const theme = useTheme();
	const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

	const landingPageSize = matchesSm ? 350 : 500;

	const headerSize = matchesSm ? 200 : 300;

	const inputRef = useRef("");
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);

	const filterOptions = createFilterOptions({
		matchFrom: "start",
	});

	const navigateToPokemon = e => {
		e.preventDefault();

		//Nao sei porque nao esta funcionando para limpar a ref
		inputRef.current.value = "";

		const eraseButton = document.getElementsByClassName("MuiAutocomplete-clearIndicator")[0];
		eraseButton && eraseButton.click();

		let cardName = inputRef.current.children[1].children[0].value.toLowerCase();
		// inputRef.current.reset();

		dispatch(getAllCardsWithSameName(cardName), navigate(`/search/${cardName}`));
	};

	const handleSubmit = e => {
		navigateToPokemon(e);

		// navigate(`/search/${inputRef.current.children[1].children[0].value.toLowerCase()}`);
	};

	return (
		<Stack spacing={2} sx={{ width: header ? headerSize : landingPageSize }}>
			<form onSubmit={e => handleSubmit(e)}>
				<Autocomplete
					id="all-pokemon-names"
					options={allPokemonNameData.map(option => option.name)}
					onInputChange={e => setInputText(e.target.value)}
					filterOptions={filterOptions}
					renderInput={params => (
						<TextField
							{...params}
							label={"Search a Pokemon"}
							variant="filled"
							ref={inputRef}
							color="success"
							style={{ backgroundColor: "#E5E3DA", borderRadius: "25px" }}
						/>
					)}
				/>
			</form>
		</Stack>
	);
}
