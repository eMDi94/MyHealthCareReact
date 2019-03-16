import {
    RETRIEVE_MY_DOCTORS,
    ADD_DOCTOR,
    DELETE_DOCTOR,
    DOCTORS_LOADING
} from '../actions/types';


const initialState = {
    myDoctors: [],
    doctorsLoading: false,
};


export default function (state = initialState, action) {
    switch(action.type) {
        case RETRIEVE_MY_DOCTORS:
            return {
                ...state,
                myDoctors: action.payload,
                doctorsLoading: false,
            };
        case ADD_DOCTOR:
            return {
                ...state,
                myDoctors: [...state.myDoctors, action.payload],
            };
        case DELETE_DOCTOR:
            return {
                ...state,
                myDoctors: state.myDoctors.filter(value => value.userCode !== action.payload),
            };
        case DOCTORS_LOADING:
            return {
                ...state,
                doctorsLoading: true,
            };
        default:
            return state;
    }
}