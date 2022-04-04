import React, { useState, useRef, useEffect } from "react";
import { TextField, Stack } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import allPokemonNameData from "../assets/json/allPokemonNames.json";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCardsWithSameName } from "../store/actions/setsActions";

export default function PokemonForm() {
	const [inputText, setInputText] = useState("");

	const inputRef = useRef();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);

	const filterOptions = createFilterOptions({
		matchFrom: "start",
	});

	const navigateToPokemon = e => {
		e.preventDefault();

		let cardName = inputRef.current.children[1].children[0].value.toLowerCase();
		// inputRef.current.reset();

		dispatch(getAllCardsWithSameName(cardName), navigate(`/search/${cardName}`));
		inputRef.current.children[1].children[0].value = "";
	};

	const handleSubmit = e => {
		console.log("test", inputRef.current);
		navigateToPokemon(e);

		// navigate(`/search/${inputRef.current.children[1].children[0].value.toLowerCase()}`);
	};

	const handleEnterPress = e => {
		console.log("Entrou um pouco");

		if (e.key === "Enter") {
			console.log("Entrou total");
			navigateToPokemon(e);
		}
	};

	return (
		<Stack spacing={2} sx={{ width: 500 }}>
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
							style={{
								// backgroundColor: "#598b1f",
								borderRadius: 20,
							}}
						/>
					)}
				/>
			</form>
		</Stack>
	);
}
