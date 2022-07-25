import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header-footer/Header3";
import Footer from "./components/header-footer/Footer";
import Loading from "./components/Loading";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/ui/Theme";
import "./styles/index.css";
import "./styles/cardsLandingPage.css";
import "./styles/header.css";
import ScrollToTop from "./components/ScrollToTop";
import RandomCardRedirect from "./pages/RandomCardRedirect";

const LandingPage = React.lazy(() =>
	import(
		/* webpackPrefetch: true */
		/* webpackChunkName: "landingPage" */ "./pages/LandingPage"
	)
);

const AllSetsPage = React.lazy(() =>
	import(
		/* webpackPrefetch: true */
		/* webpackChunkName: "AllSetsPage" */ "./pages/AllSetsPage"
	)
);

const SetCards = React.lazy(() =>
	import(
		/* webpackPrefetch: true */
		/* webpackChunkName: "SetCards" */ "./pages/SetCards"
	)
);

const CardDetail = React.lazy(() =>
	import(
		/* webpackPrefetch: true */
		/* webpackChunkName: "CardDetail" */ "./pages/CardDetail"
	)
);

const ArtistPage = React.lazy(() =>
	import(
		/* webpackPrefetch: true */
		/* webpackChunkName: "ArtistPage" */ "./pages/ArtistPage"
	)
);

const SearchCardPage = React.lazy(() =>
	import(
		/* webpackPrefetch: true */
		/* webpackChunkName: "ArtistPage" */ "./pages/SearchCardPage"
	)
);

function App() {
	const [pokemonSetData, setPokemonSetData] = useState(() => {
		const storageCountry = localStorage.getItem("@Sets:set");
		if (storageCountry) {
			return JSON.parse(storageCountry);
		} else {
			return [];
		}
	});

	const [pokemonCardDetails, setPokemonCardDetails] = useState(() => {
		const storageCountry = localStorage.getItem("@Card:cardDetail");
		if (storageCountry) {
			return JSON.parse(storageCountry);
		} else {
			return [];
		}
	});

	const [pokemonCardArtist, setPokemonCardArtist] = useState(() => {
		const storageCountry = localStorage.getItem("@Artist:artist");
		if (storageCountry) {
			return JSON.parse(storageCountry);
		} else {
			return [];
		}
	});

	const [cardName, setCardName] = useState(() => {
		const storageCountry = localStorage.getItem("@CardName:cardName");
		if (storageCountry) {
			return JSON.parse(storageCountry);
		} else {
			return [];
		}
	});

	const [value, setValue] = useState(0);
	const [selectedIndex, setSelectedIndex] = useState(0);

	useEffect(() => {
		localStorage.setItem("@Sets:set", JSON.stringify(pokemonSetData));
		localStorage.setItem("@Card:cardDetail", JSON.stringify(pokemonCardDetails));
		localStorage.setItem("@Artist:artist", JSON.stringify(pokemonCardArtist));
		localStorage.setItem("@CardName:cardName", JSON.stringify(cardName));
	}, [pokemonSetData, pokemonCardDetails]);
	return (
		<React.Suspense fallback={<Loading />}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<ScrollToTop>
						<Header
							value={value}
							setValue={setValue}
							selectedIndex={selectedIndex}
							setSelectedIndex={setSelectedIndex}
						/>
						<div className="contentWrap">
							<Routes>
								<Route
									exact
									path="/"
									element={
										<LandingPage
											setPokemonCardDetails={setPokemonCardDetails}
										/>
									}
								/>
								<Route
									exact
									path="/sets"
									element={<AllSetsPage setPokemonSetData={setPokemonSetData} />}
								/>
								<Route
									exact
									path="/set/:name"
									element={
										<SetCards
											pokemonSetData={pokemonSetData}
											setPokemonCardDetails={setPokemonCardDetails}
										/>
									}
								/>
								<Route
									exact
									path="/card/:name/:id"
									element={
										<CardDetail
											pokemonCardDetails={pokemonCardDetails}
											setPokemonCardArtist={setPokemonCardArtist}
											setPokemonSetData={setPokemonSetData}
											setCardName={setCardName}
										/>
									}
								/>
								<Route
									exact
									path="/artist/:name"
									element={
										<ArtistPage
											pokemonCardArtist={pokemonCardArtist}
											setPokemonCardDetails={setPokemonCardDetails}
										/>
									}
								/>
								<Route
									exact
									path="/search/:name"
									element={
										<SearchCardPage
											cardName={cardName}
											setPokemonCardDetails={setPokemonCardDetails}
										/>
									}
								/>
								<Route
									exact
									path="/card"
									element={
										<RandomCardRedirect
											setPokemonCardDetails={setPokemonCardDetails}
										/>
									}
								/>
							</Routes>
						</div>
						<Footer />
					</ScrollToTop>
				</BrowserRouter>
			</ThemeProvider>
		</React.Suspense>
	);
}

export default App;
