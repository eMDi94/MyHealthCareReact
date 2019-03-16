import {
    USER_LOADED,
    USER_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    AUTH_ERROR,
    REGISTER_FAILURE,
    REGISTER_SUCCESS
} from '../actions/types';


const TOKEN_KEY = 'TOKEN';


const initialState = {
    token: localStorage.getItem(TOKEN_KEY),
    isAuthenticated: false,
    isLoading: false,
    user: null,
};


export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem(TOKEN_KEY, action.payload.token);
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
            };
        case AUTH_ERROR:
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case LOGOUT_SUCCESS:
            localStorage.removeItem(TOKEN_KEY);
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        default:
            return state;
    }
}
