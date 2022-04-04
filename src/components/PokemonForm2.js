import { useState, useEffect } from "react";
import {
	Grid,
	Typography,
	makeStyles,
	useTheme,
	TextField,
	InputBase,
	FormControl,
	InputLabel,
	Stack,
	Autocomplete,
} from "@mui/material";
import { withStyles } from "@material-ui/core/styles";
import allPokemonNameData from "../assets/json/allPokemonNames.json";

const useStyles = makeStyles(theme => ({
	container: {
		padding: 20,
	},
	introText: {
		fontSize: "1.7rem",
		fontWeight: "bold",
		textAlign: "center",
		color: theme.palette.secondary.dark,
		fontFamily: "Sarabun",
		fontWeight: 700,
		marginBottom: 5,
	},
	spanIntro: {
		fontFamily: "Sarabun",
		fontWeight: 700,
		fontWeight: "bold",
		color: theme.palette.secondary.main,
	},
	input: {
		fontSize: "1rem",
		marginBottom: 10,
		width: "60em",
		backgroundColor: "#fff",
		borderRadius: 25,
		position: "relative",
	},
	margin: {
		margin: theme.spacing(1),
	},
	inputLabel: {
		color: theme.palette.secondary.main,
		fontFamily: "Sarabun",
	},
}));

export default function PokemonForm2({ search, onSetSearch, onSubmit }) {
	const classes = useStyles();
	const theme = useTheme();

	const [inputText, setInputText] = useState("");
	const [inputTextToSearch, setInputTextToSearch] = useState("");

	const handleSubmit = e => {
		// e.preventDefault();
		console.log(inputText);
	};

	const BootstrapInput = withStyles(theme => ({
		root: {
			"label + &": {
				marginTop: theme.spacing(3),
			},
		},
		input: {
			borderRadius: 25,
			position: "relative",
			backgroundColor: theme.palette.common.white,
			border: "1px solid #ced4da",
			fontSize: 18,
			width: "47em",
			height: "1.6em",
			padding: "10px 12px",
			transition: theme.transitions.create(["border-color", "box-shadow"]),
			// Use the system font instead of the default Roboto font.
			fontFamily: [
				"-apple-system",
				"BlinkMacSystemFont",
				'"Segoe UI"',
				"Roboto",
				'"Helvetica Neue"',
				"Arial",
				"sans-serif",
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(","),
			"&:focus": {
				borderColor: theme.palette.secondary.main,
			},
			[theme.breakpoints.down("sm")]: {
				width: "28em",
			},
			[theme.breakpoints.down("xs")]: {
				width: "20em",
			},
		},
	}))(InputBase);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (search) {
				onSubmit();
			}
		}, 500);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [search]);

	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="center"
			className={classes.container}
		>
			<Typography className={classes.introText}>
				<span className={classes.spanIntro}>Weather</span>
			</Typography>

			<Grid item>
				<FormControl className={classes.margin}>
					<InputLabel
						shrink
						htmlFor="bootstrap-input"
						className={classes.inputLabel}
						disabled={true}
						style={{ fontSize: "1.3rem", fontWeight: "bold", padding: "0px 12px" }}
					>
						Enter a city name
					</InputLabel>
					<BootstrapInput
						id="bootstrap-input"
						value={search}
						onChange={e => onSetSearch(e.target.value)}
						autoFocus={true}
						margin="normal"
					>
						<Autocomplete
							id="all-pokemon-names"
							options={allPokemonNameData.map(option => option.name)}
							renderInput={params => (
								<TextField
									{...params}
									label="Pokemon"
									variant="filled"
									onChange={e => setInputTextToSearch(e.target.value)}
									onSubmit={() => handleSubmit()}
									color="secondary"
									focused
								/>
							)}
							open={inputText !== "" && inputText !== 0 ? true : false}
							onInputChange={e => setInputText(e.target.value)}
						/>
					</BootstrapInput>
				</FormControl>
			</Grid>
		</Grid>
	);
}
