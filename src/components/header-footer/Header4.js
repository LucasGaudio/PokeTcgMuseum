import React, {useState, useEffect} from "react";
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
    useTheme

} from "@mui/material";
import useScrollTrigger from '@mui/material/useScrollTrigger';

import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { getRandomCard } from "../../store/actions/setsActions";

import { createTheme } from '@mui/material/styles';

import PokemonForm from "../../components/PokemonForm";
import useMediaQuery from '@mui/material/useMediaQuery';

import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import logo from "../../assets/images/smeargle.svg";
import pokeball from "../../assets/images/Balls/Pokeball_icon.png";
import greatball from "../../assets/images/Balls/Great_Ball_icon.png";
import ultraball from "../../assets/images/Balls/Ultra_Ball_icon.png";
import masterball from "../../assets/images/Balls/Master_Ball_icon.png";

function ElevationScroll(props) {
    const { children} = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
}
  
const theme = createTheme();

const userStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down("md")]: {
            marginBottom: "2em"
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "1.25em"
        }
    },
    logo:{
        height: "6.5em",
        marginTop:"0.75em",
        marginBottom:"0.75em",
        [theme.breakpoints.down("md")]: {
            height: "7em"
        },
        [theme.breakpoints.down("xs")]: {
            height: "5.5em"
        }
    },
    logoContainer: {
        padding:0,
        "&:hover":{
            backgroundColor: "transparent"
        }
    },
    tabContainer: {
        marginLeft: "auto"
    },
    tab:{
        ...theme.typography.tab,
        minWidth: 10,
        marginRight: "1.5em"

        
    },
    button:{
        ...theme.typography.estimate,
        borderRadius:"50px",
        marginLeft:"50px",
        marginRight:"25px",        
        height:"45px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    menu:{
        backgroundColor: theme.palette.common.gold ,
        color: "white",
        borderRadius: 0
    },
    menuItem:{
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover":{
            opacity: 1
        }
    },
    drawerIconContainer:{
        marginLeft: "auto",
        "&:hover":{
            backgroundColor: "transparent"
        }
    },
    drawerIcon:{
        height: "50px",
        width: "50px"
    },
    drawer: {
        backgroundColor: theme.palette.common.gold
    },
    drawerItem: {
        ...theme.typography.tab,
        color: "white",
        opacity: 0.7
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange
    },
    drawerItemSelected: {
        "& .MuiListItemText-root":{
            opacity: 1
        }
    },
    appbar: {
        // zIndex:theme.zIndex.modal + 1
        backgroundColor: "#691b07"
    },
    ballMenu: {
        width: "40px",
        height: "40px",
        float: "left"
    }

}))

export default function Header(props){
    const classes = userStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"))
    const [openDrawer, setOpenDrawer] = useState(false)
    //Menu
    const [anchorEl, setAncherEl] = useState(null)
    const [openMenu, setOpenMenu] = useState(false)
	const dispatch = useDispatch();

    const handleRandomCardClick = () => {
		dispatch(getRandomCard(1));
	};

    const handleChange = (e, newValue) =>{
        props.setValue(newValue)
    
    };

    const handleClick = (e) => {
        setAncherEl(e.currentTarget)
        setOpenMenu(true)
    }

    const handleClose = (e) => {
        setAncherEl(null)
        setOpenMenu(false)
    }

    const handleMenuItemClick = (e, i) => {
        setAncherEl(null);
        setOpenMenu(false);
        props.setSelectedIndex(i);
    }


    const routes = [
        {name: "Sets", link: "/sets", ball: pokeball, alt: "pokeball", activeIndex: 0},
        {name: "History", link: "/history", ball: greatball, alt: "great ball", activeIndex: 1},        
        {name: "Sets", link: "/sets", ball: ultraball, alt: "ultra ball", activeIndex: 2},        
        {name: "Random Card", link: "/card", ball: masterball, alt: "master ball", activeIndex: 3}
    ];

    useEffect(()=> {
        [...routes].forEach(route => {
            switch(window.location.pathname) {
                case `${route.link}`:
                    if (props.value !== route.activeIndex) {
                        props.setValue(route.activeIndex);
                        if (route.selectedIndex && route.selectedIndex !== props.selectedIndex) {
                            props.setSelectedIndex(route.selectedIndex)
                        }
                    }
                    break;
                    
                default:
                    break;
            }
        });
    },[props.value, props.selectedIndex, routes, props]);

    const tabs = (
        <>
            <Tabs
                value={props.value}
                onChange={handleChange}
                className={classes.tabContainer}
                indicatorColor="primary"
            > 
                
                {routes.map((route, index)=> (                 

                        <Link to={route.link} style={{textDecoration:"none"}}>
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
                            onClick={() => route.name === 'Random Card' && handleRandomCardClick()}
                        />                  
                        </Link>

                ))}              
            </Tabs>
                
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleClose}
                    MenuListProps={{onMouseLeave:handleClose}}
                    classes={{paper: classes.menu}}
                    elevation={0}
                    style={{zIndex: 1302}}
                    keepMounted
                >
                </Menu>
        </>
    )

    const drawer = (
        <>
            <SwipeableDrawer
             
                open={openDrawer}
                onClose={()=>setOpenDrawer(false)} 
                onOpen={() => setOpenDrawer(true)}
                classes={{paper: classes.drawer}}
            >
                <div className={classes.toolbarMargin}/>
                <List >
                    {routes.map(route => (
                        <ListItem
                            key={`${route}${route.activeIndex}`}
                            divider
                            button
                            component={Link}
                            to={route.link}
                            selected={props.value === route.activeIndex}
                            classes={{selected: classes.drawerItemSelected}}
                            onClick={() => {setOpenDrawer(false); props.setValue(route.activeIndex)}}
                        >
                            <ListItemText
                                className={classes.drawerItem}
                                disableTypography>
                                {route.name}
                            </ListItemText>
                        </ListItem>

                    ))}                                                     
                    <ListItem
                        selected={props.value === 5}
                        classes={{root: classes.drawerItemEstimate, selected: classes.drawerItemSelected }}
                        onClick={() => {setOpenDrawer(false); props.setValue(5)}}
                        divider
                        button
                        component={Link}
                        to ="/estimate">
                        <ListItemText 
                            className={classes.drawerItem}
                            disableTypography>
                            Free Estimate
                        </ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton
                className={classes.drawerIconContainer}
                onClick={() => setOpenDrawer(!openDrawer)}
                disableRipple
            >
                <MenuIcon className={classes.drawerIcon} />

            </IconButton>
        </>
    )
    return(
        <>
            <ElevationScroll>
                <AppBar position="static" className={classes.appbar}>
                    <Toolbar disableGutters>
                        <Button className={classes.logoContainer} component={Link} to="/" disableRipple onClick={()=>props.setValue(0)}>
                            <img alt="company logo" className={classes.logo} src={logo}/>
                        </Button>
                        {matches ? drawer : tabs}
                    </Toolbar>
                </AppBar>  
            </ElevationScroll>
            <div className={classes.toolbarMargin}/>
        </>

    )
}