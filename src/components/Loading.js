import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, CircularProgress } from "@mui/material";

const useStyles = makeStyles(theme => ({
	loadingContainer: {
		height: "88vh",
	},
}));

export default function Loading() {
	const classes = useStyles();

	return (
		<Grid
			item
			container
			justifyContent="center"
			alignItems="center"
			className={classes.loadingContainer}
		>
			<CircularProgress />
		</Grid>
	);
}
