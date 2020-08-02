import { UPDATE_WPM } from "../actions"

const initialState = {
    wpm: 0
}
function wordPMReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_WPM:
            const wpm = Math.ceil(((action.typedCharLength / 5) / (60 / action.timeTaken)));
            return { ...state, wpm };

        default:
            return state;
    }
}


export default wordPMReducer;