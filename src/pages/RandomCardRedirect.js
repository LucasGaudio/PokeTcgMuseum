import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import useMediaQuerry from "@mui/material/useMediaQuery";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

export default function RandomCardRedirect({ setPokemonCardDetails }) {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);

	useEffect(() => {
		if (data !== null) {
			navigate(`/card/${data[0].name.toLowerCase()}/${data[0].id}`);
			setPokemonCardDetails(data[0]);
		}
		// console.log("data random", data);
	}, [data]);

	return <Loading />;
}
