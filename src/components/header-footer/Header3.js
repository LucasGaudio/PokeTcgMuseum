import React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
	AppBar,
	Button,
	Grid,
	Tab,
	Tabs,
	Toolbar,
	InputBase,
	Box,
	IconButton,
	Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { getRandomCard } from "../../store/actions/setsActions";

import PokemonForm from "../../components/PokemonForm";

import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import logo from "../../assets/images/smeargle.svg";
import pokeball from "../../assets/images/Balls/Pokeball_icon.png";
import greatball from "../../assets/images/Balls/Great_Ball_icon.png";
import ultraball from "../../assets/images/Balls/Ultra_Ball_icon.png";
import masterball from "../../assets/images/Balls/Master_Ball_icon.png";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	width: "50%",
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "50%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

export default function Header() {
	const { data, error } = useSelector(state => state.pokedex);
	const dispatch = useDispatch();

	const handleRandomCardClick = () => {
		dispatch(getRandomCard(1));
	};
	console.log("Header data", data);
	return (
		<Box sx={{ flexGrow: 1, marginBottom: 5 }}>
			<AppBar position="static" sx={{ backgroundColor: "#691b07" }}>
				<Toolbar>
					<Grid container justifyContent="" alignItems="center">
						<Grid item xs={2}>
							<Button
								className={"logoContainer"}
								component={Link}
								to="/"
								disableRipple
							>
								<img alt="company logo" src={logo} className={"logo"} />
							</Button>
						</Grid>

						<Grid item xs={4}>
							<PokemonForm />
						</Grid>

						<Grid item xs={6}>
							<Tabs>
								<Grid item container justifyContent="space-evenly">
									<Link to="/sets" className={"tabWrapper"}>
										<img alt="ball" src={pokeball} className={"ballMenu"} />
										<Tab label="Sets" style={{ minWidth: 40 }} />
									</Link>

									<Link to="/sets" className={"tabWrapper"}>
										<img alt="ball" src={greatball} className={"ballMenu"} />
										<Tab label="History" style={{ minWidth: 50 }} />
									</Link>

									<Link to="/sets" className={"tabWrapper"}>
										<img alt="ball" src={ultraball} className={"ballMenu"} />
										<Tab label="Sets" style={{ minWidth: 50 }} />
									</Link>

									<Link
										to="/card"
										className={"tabWrapper"}
										onClick={() => handleRandomCardClick()}
									>
										<img alt="ball" src={masterball} className={"ballMenu"} />
										<Tab label="Random Card" style={{ minWidth: 2 }} />
									</Link>
								</Grid>
							</Tabs>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
