import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import { Link } from "react-router-dom";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import theme from "../../components/ui/Theme";
import {
	AppBar,
	Toolbar,
	useScrollTrigger,
	Tabs,
	Tab,
	Button,
	Menu,
	MenuItem,
	SwipeableDrawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";

import pokeball from "../../assets/images/Balls/Pokeball_icon.png";
import greatball from "../../assets/images/Balls/Great_Ball_icon.png";
import ultraball from "../../assets/images/Balls/Ultra_Ball_icon.png";
import masterball from "../../assets/images/Balls/Master_Ball_icon.png";

import logo from "../../assets/images/hgss-tcg-logo.png";

function ElevationScroll(props) {
	const { children } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

const userStyles = makeStyles(theme => ({
	toolbarMargin: {
		marginBottom: "3em",
	},
	logo: {
		height: "6.5em",
		marginTop: "0.75em",
		marginBottom: "0.75em",
	},
	logoContainer: {
		padding: 0,
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	tabContainer: {
		marginLeft: "auto",
	},
	tab: {
		minWidth: 10,
		marginRight: "1.5em",
	},
	button: {
		borderRadius: "50px",
		marginLeft: "50px",
		marginRight: "25px",
		height: "45px",
		"&:hover": {},
	},
	menu: {
		color: "white",
		borderRadius: 0,
	},
	menuItem: {
		opacity: 0.7,
		"&:hover": {
			opacity: 1,
		},
	},
	drawerIconContainer: {
		marginLeft: "auto",
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	drawerIcon: {
		height: "50px",
		width: "50px",
	},
	drawer: {},
	drawerItem: {
		color: "white",
		opacity: 0.7,
	},
	drawerItemEstimate: {},
	drawerItemSelected: {
		"& .MuiListItemText-root": {
			opacity: 1,
		},
	},
	appbar: {},
	ballMenu: {
		width: "40px",
		height: "40px",
		float: "left",
	},
}));

export default function Header(props) {
	const classes = userStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));
	const [openDrawer, setOpenDrawer] = useState(false);
	//Menu
	const [anchorEl, setAncherEl] = useState(null);
	const [openMenu, setOpenMenu] = useState(false);

	const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

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

	const menuOptions = [
		{ name: "TCG", link: "/tcg", activeIndex: 2, selectedIndex: 0 },
		{ name: "HGSS", link: "/hgss", activeIndex: 2, selectedIndex: 1 },
		{ name: "Unleashed", link: "/unleashed", activeIndex: 2, selectedIndex: 2 },
		{ name: "Undaunted", link: "/undaunted", activeIndex: 2, selectedIndex: 3 },
		{ name: "Triumphant", link: "/triumphant", activeIndex: 2, selectedIndex: 4 },
	];

	const routes = [
		{ name: "Home", link: "/", ball: pokeball, alt: "pokeball", activeIndex: 0 },
		{ name: "Game", link: "/game", ball: greatball, alt: "great ball", activeIndex: 1 },
		{
			name: "TCG",
			link: "/tcg",
			ball: ultraball,
			alt: "ultra ball",
			activeIndex: 2,
			ariaOwns: anchorEl ? "simple-menu" : undefined,
			ariaPopup: anchorEl ? "true" : undefined,
			mouseOver: event => handleClick(event),
		},
		{
			name: "Wallpapers",
			link: "/wallpaper",
			ball: masterball,
			alt: "master ball",
			activeIndex: 3,
		},
	];

	useEffect(() => {
		[...menuOptions, ...routes].forEach(route => {
			switch (window.location.pathname) {
				case `${route.link}`:
					break;

				default:
					break;
			}
		});
	}, [props.value, menuOptions, props.selectedIndex, routes, props]);

	const tabs = (
		<React.Fragment>
			<Tabs value={props.value} className={classes.tabContainer} indicatorColor="primary">
				{routes.map((route, index) => (
					<Link to={route.link} style={{ textDecoration: "none" }}>
						<img src={route.ball} alt={route.alt} className={classes.ballMenu} />
						<Tab
							key={`${route}${index}`}
							className={classes.tab}
							component={Link}
							to={route.link}
							label={route.name}
							aria-owns={route.ariaOwns}
							aria-haspopup={route.ariaPopup}
							onMouseOver={route.mouseOver}
						/>
					</Link>
				))}
			</Tabs>

			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				open={openMenu}
				onClose={handleClose}
				MenuListProps={{ onMouseLeave: handleClose }}
				classes={{ paper: classes.menu }}
				elevation={0}
				style={{ zIndex: 1302 }}
				keepMounted
			>
				{menuOptions.map((option, i) => (
					<MenuItem
						key={`${option}${i}`}
						classes={{ root: classes.menuItem }}
						onClick={event => {
							handleMenuItemClick(event, i);
							handleClose();
						}}
						selected={i === props.selectedIndex && props.value === 1}
						component={Link}
						to={option.link}
					>
						{option.name}
					</MenuItem>
				))}
			</Menu>
		</React.Fragment>
	);

	const drawer = (
		<React.Fragment>
			<SwipeableDrawer
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				onOpen={() => setOpenDrawer(true)}
				classes={{ paper: classes.drawer }}
			>
				<div className={classes.toolbarMargin} />
				<List>
					{routes.map(route => (
						<ListItem
							key={`${route}${route.activeIndex}`}
							divider
							button
							component={Link}
							to={route.link}
							selected={props.value === route.activeIndex}
							classes={{ selected: classes.drawerItemSelected }}
							onClick={() => {
								setOpenDrawer(false);
							}}
						>
							<ListItemText className={classes.drawerItem} disableTypography>
								{route.name}
							</ListItemText>
						</ListItem>
					))}
					<ListItem
						selected={props.value === 5}
						classes={{
							root: classes.drawerItemEstimate,
							selected: classes.drawerItemSelected,
						}}
						onClick={() => {
							setOpenDrawer(false);
						}}
						divider
						button
						component={Link}
						to="/estimate"
					>
						<ListItemText className={classes.drawerItem} disableTypography>
							Free Estimate
						</ListItemText>
					</ListItem>
				</List>
			</SwipeableDrawer>
			<IconButton
				className={classes.drawerIconContainer}
				onClick={() => setOpenDrawer(!openDrawer)}
				disableRipple
			></IconButton>
		</React.Fragment>
	);
	return (
		<React.Fragment>
			<ElevationScroll>
				<AppBar position="fixed" className={classes.appbar}>
					<Toolbar disableGutters>
						<Button
							className={classes.logoContainer}
							component={Link}
							to="/"
							disableRipple
						>
							<img alt="company logo" className={classes.logo} src={logo} />
						</Button>
						{matches ? drawer : tabs}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
}
