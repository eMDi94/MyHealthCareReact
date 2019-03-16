import React from 'react';
import PropTypes from 'prop-types';
import InputText from '../common/InputText';


function PatientProfile(props) {
    const { patient } = props;
    return (
        <div style={{marginTop: 10}}>
            <InputText value={patient.firstName} />
            <InputText value={patient.lastName} />
            <InputText value={patient.city} />
            <InputText value={patient.province} />
            <InputText value={patient.region} />
            <InputText value={patient.email} />
        </div>
    );
}


PatientProfile.propTypes = {
    patient: PropTypes.object.isRequired,
};


export default PatientProfile;
