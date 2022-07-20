import React from "react";
import { makeStyles } from "@mui/styles";
import useMediaQuerry from "@mui/material/useMediaQuery";
import { Grid, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();
const useStyles = makeStyles(() => ({
	cardDiv: {
		flex: "none",
		width: "90%",
		margin: 16,
		[theme.breakpoints.down("md")]: {
			width: "45%",
		},
	},
	cardAnchor: {
		cursor: "pointer",
		textDecoration: "none",
	},
	cardImage: {
		width: "113%",
		height: "auto",
		borderRadius: 10,
		display: "inline",
		cursor: "pointer",
		boxShadow: "5px 5px 6px rgb(0 0 0 / 45%)",
		transition: "all .2s ease-out",
		width: 250,
		height: 348,
		"&:hover": {
			transition: "all .2s ease-in-out",
			transform: "scale(1.1)",
		},
		[theme.breakpoints.down("md")]: {
			width: 155,
			height: 222,
		},
	},
}));

export default function Card({ data, path, onClickFunction }) {
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Grid
			item
			component={Link}
			variant="contained"
			to={`/${path}/${data.name.toLowerCase()}/${data.id}`}
			onClick={() => onClickFunction(data)}
			onAuxClick={() => onClickFunction(data)}
		>
			<div className={classes.cardDiv}>
				<div className={classes.cardAnchor} alt={data.id}>
					<img className={classes.cardImage} src={data.images.small} alt={data.name} />
				</div>
			</div>
		</Grid>
	);
}
