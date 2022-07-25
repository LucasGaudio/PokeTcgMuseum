import React, { useState, useEffect } from "react";
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
	Menu,
	MenuItem,
	SwipeableDrawer,
	List,
	ListItem,
	ListItemText,
	useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { getRandomCard } from "../../store/actions/setsActions";

import PokemonForm from "../../components/PokemonForm";
import useMediaQuery from "@mui/material/useMediaQuery";

import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import logo from "../../assets/images/smeargle.svg";
import logoText from "../../assets/images/logoText.png";

import pokeball from "../../assets/images/Balls/Pokeball_icon.png";
import greatball from "../../assets/images/Balls/Great_Ball_icon.png";
import ultraball from "../../assets/images/Balls/Ultra_Ball_icon.png";
import masterball from "../../assets/images/Balls/Master_Ball_icon.png";

import { ClassNames } from "@emotion/react";

export default function Header(props) {
	const { data, error } = useSelector(state => state.pokedex);
	const dispatch = useDispatch();
	const theme = useTheme();
	const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

	const [anchorEl, setAncherEl] = useState(null);
	const [openMenu, setOpenMenu] = useState(false);
	const [openDrawer, setOpenDrawer] = useState(false);

	const handleRandomCardClick = () => {
		dispatch(getRandomCard(1));
	};
	// console.log("Header data", data);

	const handleChange = (e, newValue) => {
		props.setValue(newValue);
	};

	const handleClick = e => {
		setAncherEl(e.currentTarget);
		setOpenMenu(true);
	};

	const handleClose = e => {
		setAncherEl(null);
		setOpenMenu(false);
	};

	const handleMenuItemClick = (e, i) => {
		setAncherEl(null);
		setOpenMenu(false);
		props.setSelectedIndex(i);
	};

	const routes = [
		{ name: "Sets", link: "/sets", image: pokeball, alt: "pokeball", activeIndex: 0 },
		{ name: "History", link: "/history", image: greatball, alt: "great ball", activeIndex: 1 },
		{ name: "Artists", link: "/artists", image: ultraball, alt: "ultra ball", activeIndex: 2 },
		{
			name: "Random Card",
			link: "/card",
			image: masterball,
			alt: "master ball",
			activeIndex: 3,
		},
	];

	useEffect(() => {
		[...routes].forEach(route => {
			switch (window.location.pathname) {
				case `${route.link}`:
					if (props.value !== route.activeIndex) {
						props.setValue(route.activeIndex);
						if (route.selectedIndex && route.selectedIndex !== props.selectedIndex) {
							props.setSelectedIndex(route.selectedIndex);
						}
					}
					break;

				default:
					break;
			}
		});
	}, [props.value, props.selectedIndex, routes, props]);

	const tabs = (
		<Tabs className="tabsWrapper">
			<Grid item container justifyContent="space-evenly">
				{routes.map((route, index) => (
					<Link
						to={route.link}
						className={"tabWrapper"}
						onClick={() => route.name === "Random Card" && handleRandomCardClick()}
					>
						<img alt={route.alt} src={route.image} className={"ballMenu"} />
						<Tab label={route.name} style={{ minWidth: 35 }} />
					</Link>
				))}
			</Grid>
		</Tabs>
	);

	const drawer = (
		<div>
			<SwipeableDrawer
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				onOpen={() => setOpenDrawer(true)}
				// classes={{paper: classes.drawer}}
			>
				<div
				// className={classes.toolbarMargin}
				/>
				<List>
					{routes.map(route => (
						<ListItem
							key={`${route}${route.activeIndex}`}
							divider
							button
							component={Link}
							to={route.link}
							selected={props.value === route.activeIndex}
							// classes={{selected: classes.drawerItemSelected}}
							onClick={() => {
								setOpenDrawer(false);
								props.setValue(route.activeIndex);
							}}
						>
							<ListItemText
								// className={classes.drawerItem}
								disableTypography
							>
								{route.name}
							</ListItemText>
						</ListItem>
					))}
				</List>
			</SwipeableDrawer>
			<IconButton
				// className={classes.drawerIconContainer}
				onClick={() => setOpenDrawer(!openDrawer)}
				disableRipple
			>
				<MenuIcon
				// className={classes.drawerIcon}
				/>
			</IconButton>
		</div>
	);

	return (
		<Box sx={{ flexGrow: 1, marginBottom: 5 }}>
			<AppBar
				position="static"
				sx={{ backgroundColor: "#691b07", padding: !matchesSm && "0 50px" }}
			>
				<Toolbar>
					<Grid container justifyContent="space-between" alignItems="center" sx={{}}>
						<Grid item md={6} style={{ display: "flex", alignItems: "center" }}>
							<Grid item container>
								<Button
									className={"logoContainer"}
									component={Link}
									to="/"
									disableRipple
								>
									<img alt="company logo" src={logo} className={"logo"} />
									<img
										alt="company logo"
										src={logoText}
										className={"logoText"}
										style={{ maxWidth: 160, marginLeft: 20 }}
									/>
								</Button>
							</Grid>

							{!matchesSm && (
								<Grid item container style={{ marginRight: 25 }}>
									<PokemonForm header={true} />
								</Grid>
							)}
						</Grid>

						<Grid item md={6}>
							{matchesSm ? drawer : tabs}
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
