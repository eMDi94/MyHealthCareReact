import {
    RETRIEVE_POSOLOGIES,
    ADD_POSOLOGY,
    DELETE_POSOLOGY,
    POSOLOGIES_LOADING,
} from './types';
import { objectKeysFromCamelCaseToSnakeCase, objectKeysFromSnakeCaseToCamelCase } from '../utils/case';
import { tokenConfig } from '../utils/http';
import axios from 'axios';
import { createMessage } from './messages';


export const retrievePosologies = patientCode => (dispatch, getState) => {
    dispatch({
        type: POSOLOGIES_LOADING,
    })
    const config = tokenConfig(getState().authReducer.token);
    const url = `http://localhost:8000/api/medicines/posologies/${patientCode}/`;
    axios
        .get(url, config)
        .then(res => {
            const posologies = res.data.map(p => objectKeysFromSnakeCaseToCamelCase(p));
            dispatch({
                type: RETRIEVE_POSOLOGIES,
                payload: posologies,
            });
        })
        .catch(() => {
            dispatch(
                createMessage({ error: 'Non è stato possibile recuperare le posologie' })
            );
        });
}


export const deletePosology = posologyCode => (dispatch, getState) => {
    const config = tokenConfig(getState().authReducer.token);
    const url = `http://localhost:8000/api/medicines/doctor/delete-posology/${posologyCode}/`;
    axios
        .delete(url, config)
        .then(res => {
            dispatch({
                type: DELETE_POSOLOGY,
                payload: posologyCode,
            });
            dispatch(
                createMessage({ success: 'Posologia rimossa con successo' })
            );
        })
        .catch(() => {
            dispatch(
                createMessage({ error: 'Non è stato possibile rimuovere la posologia dalla lista' })
            );
        });
}


export const addPosology = ({ dayOfTheWeek, medicineCode, hour, quantity }) => (dispatch, getState) => {
    const config = tokenConfig(getState().authReducer.token);
    const url = 'http://localhost:8000/api/medicines/doctor/create-posology/';
    const data = objectKeysFromCamelCaseToSnakeCase({
        dayOfTheWeek,
        medicine: medicineCode,
        hour,
        quantity,
    });
    console.log(data);
    axios
        .post(url, data, config)
        .then(res => {
            const posology = objectKeysFromSnakeCaseToCamelCase(res.data);
            dispatch({
                type: ADD_POSOLOGY,
                payload: posology,
            });
            dispatch(
                createMessage({ success: 'Posologia aggiunta con successo' })
            );
        })
        .catch(() => {
            dispatch(
                createMessage({ error: 'Non è stato possibile aggiungere la posologia' })
            );
        });
}
