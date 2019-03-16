import {
    GET_MEDICINES,
    ADD_MEDICINE,
    REMOVE_MEDICINE,
    MEDICINES_LOADING
} from '../actions/types';


const initialState = {
    medicines: [],
    of: null,
    medicinesLoading: false,
};


export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MEDICINES:
            return {
                ...state,
                medicines: action.payload.medicines,
                of: action.payload.code,
                medicinesLoading: false,
            };
        case ADD_MEDICINE:
            return {
                ...state,
                medicines: [...state.medicines, action.payload],
            };
        case REMOVE_MEDICINE:
            return {
                ...state,
                medicines: state.medicines.filter(value => value.code !== action.payload),
            };
        case MEDICINES_LOADING:
            return {
                ...state,
                medicinesLoading: true,
            };
        default:
            return state;
    }
}
