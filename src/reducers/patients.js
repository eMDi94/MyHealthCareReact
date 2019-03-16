import { RETRIEVE_MY_PATIENTS, PATIENTS_LOADING } from '../actions/types';


const initialState = {
    myPatients: [],
    patientsLoading: false,
};


export default function (state = initialState, action) {
    switch (action.type) {
        case RETRIEVE_MY_PATIENTS:
            return {
                ...state,
                myPatients: action.payload,
                patientsLoading: false,
            };
        case PATIENTS_LOADING:
            return {
                ...state,
                patientsLoading: true,
            }
        default:
            return state;
    }
}
