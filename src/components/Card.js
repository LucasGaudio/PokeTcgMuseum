import React from "react";
import { makeStyles, useTheme } from "@mui/styles";
import useMediaQuerry from "@mui/material/useMediaQuery";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	cardWrapper: {},
	cardDiv: {
		flex: "none",
		width: "90%",
		margin: 16,
	},
	cardAnchor: {
		cursor: "pointer",
		textDecoration: "none",
		// width: "114%",
	},
	cardImage: {
		width: "113%",
		height: "auto",
		borderRadius: 10,
		display: "inline",
		cursor: "pointer",
		boxShadow: "5px 5px 6px rgb(0 0 0 / 45%)",
		transition: "all .2s ease-out",
		maxWidth: "249.6px",
		maxHeight: "348.4px",
		"&:hover": {
			transition: "all .2s ease-in-out",
			transform: "scale(1.1)",
		},
	},
}));

export default function Card({ data, path, onClickFunction }) {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<Grid
			item
			className={classes.cardWrapper}
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
