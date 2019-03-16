import {
    ADD_PARAMETER,
    DELETE_PARAMETER,
    RETRIEVE_PARAMETERS,
    PARAMETERS_LOADING,
    ADD_MEASURE,
    RETRIEVE_MEASURES,
    DELETE_MEASURE,
    MEASURES_LOADING
} from '../actions/types';


const initialState = {
    parameters: [],
    of: null,
    parametersLoading: false,
    measures: [],
    measuresLoading: false,
};


export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_PARAMETER:
            return {
                ...state,
                parameters: [...state.parameters, action.payload],
            };
        case RETRIEVE_PARAMETERS:
            return {
                ...state,
                parameters: action.payload.parameters,
                of: action.payload.code,
                parametersLoading: false,
            };
        case DELETE_PARAMETER:
            return {
                ...state,
                parameters: state.parameters.filter(value => value.code !== action.payload),
            };
        case PARAMETERS_LOADING: {
            return {
                ...state,
                parametersLoading: true,
            };
        }
        case ADD_MEASURE:
            return {
                ...state,
                measures: [...state.measures, action.payload],
            };
        case DELETE_MEASURE:
            return {
                ...state,
                measures: state.measures.filter(value => value.code !== action.payload),
            };
        case RETRIEVE_MEASURES:
            return {
                ...state,
                measures: action.payload,
                measuresLoading: false,
            };
        case MEASURES_LOADING:
            return {
                ...state,
                measuresLoading: true,
            };
        default:
            return state;
    }
}
