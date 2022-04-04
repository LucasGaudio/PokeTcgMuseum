import {
	GET_SET,
	GET_ARTIST,
	SET_ERROR,
	GET_ALL_CARDS_WITH_SAME_NAME,
	GET_RANDOM_CARD,
} from "../types";

import pokemon from "pokemontcgsdk";

pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

const setError = err => {
	return {
		type: SET_ERROR,
		payload: err,
	};
};

export const getArtist = artist => {
	return async dispatch => {
		dispatch({
			type: GET_ARTIST,
			payload: null,
		});
		try {
			pokemon.card
				.all({ q: `artist:${artist.replace(/ /g, ".")}`, orderBy: "set.releaseDate" })
				.then(result => {
					const resData = result;

					dispatch({
						type: GET_ARTIST,
						payload: resData,
					});
				});
		} catch (err) {
			dispatch(setError(err.message));
		}
	};
};

export const getAllCardsWithSameName = (cardName, handleNavigation = () => {}) => {
	return async dispatch => {
		dispatch({
			type: GET_ALL_CARDS_WITH_SAME_NAME,
			payload: null,
		});
		try {
			pokemon.card.all({ q: `name:${cardName}`, orderBy: "set.releaseDate" }).then(result => {
				handleNavigation();

				const resData = result;
				dispatch({
					type: GET_ALL_CARDS_WITH_SAME_NAME,
					payload: resData,
				});
			});
		} catch (err) {
			dispatch(setError(err.message));
		}
	};
};

export const getSet = setId => {
	return async dispatch => {
		dispatch({
			type: GET_SET,
			payload: null,
		});
		try {
			pokemon.card.all({ q: `set.id:${setId}` }).then(result => {
				const resData = result;

				dispatch({
					type: GET_SET,
					payload: resData,
				});
			});
		} catch (err) {
			dispatch(setError(err.message));
		}
	};
};

export const getRandomCard = numberOfCards => {
	return async dispatch => {
		dispatch({
			type: GET_RANDOM_CARD,
			payload: null,
		});
		try {
			let newSet;
			pokemon.set
				.all()
				.then(sets => {
					let item = sets[Math.floor(Math.random() * sets.length)];
					newSet = item.id;
				})
				.then(() => {
					pokemon.card.all({ q: `set.id:${newSet}` }).then(result => {
						let setLength = result.length;

						let arr = [];
						while (arr.length < numberOfCards) {
							let r = Math.floor(Math.random() * setLength);
							if (arr.indexOf(r) === -1) arr.push(r);
						}

						let newArr = [];
						for (let i = 0; i < numberOfCards; i++) {
							newArr.push(result[arr[i]]);
						}

						const resData = newArr;

						dispatch({
							type: GET_RANDOM_CARD,
							payload: resData,
						});
					});
				});
		} catch (err) {
			dispatch(setError(err.message));
		}
	};
};
