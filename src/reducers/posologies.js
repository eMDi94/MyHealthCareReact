import {
    RETRIEVE_POSOLOGIES,
    ADD_POSOLOGY,
    DELETE_POSOLOGY,
    POSOLOGIES_LOADING,
} from '../actions/types';


const initialState = {
    posologies: [],
    posologiesLoading: false,
};


export default function (state = initialState, action) {
    switch (action.type) {
        case RETRIEVE_POSOLOGIES:
            return {
                ...state,
                posologies: action.payload,
                posologiesLoading: false,
            };
        case ADD_POSOLOGY:
            return {
                ...state,
                posologies: [...state.posologies, action.payload],
            };
        case DELETE_POSOLOGY:
            return {
                ...state,
                posologies: state.posologies.filter(value => value.code !== action.payload),
            };
        case POSOLOGIES_LOADING:
            return {
                ...state,
                posologiesLoading: true,
            
            };
        default:
            return state;
    }
}
