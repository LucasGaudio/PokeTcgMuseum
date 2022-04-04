import { combineReducers } from "redux";
import pokedexReducer from "./pokedexReducer";

const reducers = combineReducers({
	pokedex: pokedexReducer,
});

export default reducers;
