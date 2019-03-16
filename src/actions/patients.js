import { RETRIEVE_MY_PATIENTS, PATIENTS_LOADING } from './types';
import { tokenConfig } from '../utils/http';
import { objectKeysFromSnakeCaseToCamelCase } from '../utils/case';
import axios from 'axios';
import { createMessage } from './messages';


export const retrievePatients = () => (dispatch, getState) => {
    if (getState().myPatientsReducer.myPatients.length > 0) return;
    dispatch({
        type: PATIENTS_LOADING,
    });
    const config = tokenConfig(getState().authReducer.token);
    axios
        .get('http://localhost:8000/api/accounts/doctor/my-patients/', config)
        .then(res => {
            const patients = res.data.map(patient => objectKeysFromSnakeCaseToCamelCase(patient));
            dispatch({
                type: RETRIEVE_MY_PATIENTS,
                payload: patients,
            });
        })
        .catch(() => {
            dispatch(
                createMessage({ error: 'Non è stato possibile recuperare la lista dei pazienti' })
            );
        });
}
