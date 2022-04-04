import {
	GET_SET,
	GET_ARTIST,
	SET_ERROR,
	GET_ALL_CARDS_WITH_SAME_NAME,
	GET_RANDOM_CARD,
} from "../types";

const initialState = {
	data: null,
	newData: null,
	error: "",
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_SET:
			return {
				data: action.payload,
				error: "",
			};
		case GET_ARTIST:
			return {
				data: action.payload,
				error: "",
			};

		case GET_ALL_CARDS_WITH_SAME_NAME:
			return {
				data: action.payload,
				error: "",
			};
		case GET_RANDOM_CARD:
			return {
				data: action.payload,
				error: "",
			};
		case SET_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
