import { createStore } from "redux";
import wordPMReducer from "./reducers/wordPMReducer";

const store = createStore(wordPMReducer);

export default store;