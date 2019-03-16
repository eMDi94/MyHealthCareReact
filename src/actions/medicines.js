import {
    ADD_MEDICINE,
    GET_MEDICINES,
    REMOVE_MEDICINE,
    MEDICINES_LOADING
} from './types';
import axios from 'axios';
import { objectKeysFromSnakeCaseToCamelCase } from '../utils/case';
import { tokenConfig } from '../utils/http';
import { createMessage } from './messages';


export const getMedicines = (userCode) => (dispatch, getState) => {
    if (getState().medicinesReducer.of === userCode) {
        return;
    }
    dispatch({
        type: MEDICINES_LOADING,
    });
    const config = tokenConfig(getState().authReducer.token);
    const url = `http://localhost:8000/api/medicines/${userCode}/`;
    axios
        .get(url, config)
        .then(res => {
            const medicines = res.data.map(value => objectKeysFromSnakeCaseToCamelCase(value));
            dispatch({
                type: GET_MEDICINES,
                payload: {
                    medicines,
                    code: userCode,
                },
            });
        })
        .catch(() => {
            dispatch(
                createMessage({ error: 'Non è stato possibile recuperare la lista dei farmaci' })
            );
        });
}


export const addMedicine = ({ name, quantity, unity }) => (dispatch, getState) => {
    const medicine = {
        name,
        quantity,
        unity,
    };
    const config = tokenConfig(getState().authReducer.token);
    axios
        .post('http://localhost:8000/api/medicines/patient/create-medicine/', medicine, config)
        .then(res => {
            dispatch({
                type: ADD_MEDICINE,
                payload: res.data,
            });
            dispatch(
                createMessage({ success: 'Farmaco aggiunto con successo' })
            );
        })
        .catch(() => {
            dispatch(
                createMessage({ error: 'Farmaco non aggiunto.' })
            );
        });
}


export const deleteMedicine = (medicineCode) => (dispatch, getState) => {
    const config = tokenConfig(getState().authReducer.token);
    const url = `http://localhost:8000/api/medicines/patient/delete-medicine/${medicineCode}/`;
    axios
        .delete(url, config)
        .then(res => {
            dispatch({
                type: REMOVE_MEDICINE,
                payload: medicineCode,
            });
            dispatch(
                createMessage({ success: 'Farmaco rimosso con successo' })
            );
        })
        .catch(err => {
            dispatch(
                createMessage({ error: 'Non è stato possibile cancellare il farmaco.' })
            );
        });
}
