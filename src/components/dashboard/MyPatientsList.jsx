import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { retrievePatients } from '../../actions/patients';
import { MetroSpinner } from 'react-spinners-kit';


function DisplayPatient(props) {
    const { patient, selectPatient, selectedPatientCode } = props;
    const button = (!selectedPatientCode || selectedPatientCode !== patient.code) ? 
        <button className="button is-info has-text-white" onClick={() => selectPatient(patient)}>
            Vedi Scheda
        </button> :
        <button className="button has-background-grey-light has-text-white">
            Selezionato
        </button>
    return (
        <tr>
            <td>{ patient.firstName }</td>
            <td>{ patient.lastName }</td>
            <td>{ patient.email }</td>
            <td>{ patient.city }</td>
            <td>{ patient.province }</td>
            <td>{ patient.region }</td>
            <td>
                {
                    button
                }
            </td>
        </tr>
    );
}


DisplayPatient.propTypes = {
    patient: PropTypes.object.isRequired,
    selectPatient: PropTypes.func.isRequired,
    selectedPatientCode: PropTypes.string,
};


class MyPatientsList extends React.Component {

    componentWillMount() {
        this.props.retrievePatients();
    }

    render() {
        const { patientsLoading } = this.props;
        if (patientsLoading === true) {
            return <MetroSpinner size={30} />;
        } 
        const { patients, selectPatient, selectedPatientCode } = this.props;
        return (
            <React.Fragment>
                <table className="table is-centered is-striped">
                    <thead>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Email</th>
                        <th>Città</th>
                        <th>Provincia</th>
                        <th>Regione</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {
                            patients.map((patient, index) => 
                                <DisplayPatient patient={patient} selectPatient={selectPatient}
                                        key={index} selectedPatientCode={selectedPatientCode} />)
                        }
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}


MyPatientsList.propTypes = {
    patients: PropTypes.array.isRequired,
    retrievePatients: PropTypes.func.isRequired,
    selectPatient: PropTypes.func.isRequired,
    patientsLoading: PropTypes.bool.isRequired,
    selectedPatientCode: PropTypes.string,
};


const mapStateToProps = state => ({
    patients: state.myPatientsReducer.myPatients,
    patientLoading: state.myPatientsReducer.patientsLoading,
});


const mapDispatchToProps = {
    retrievePatients,
};


export default connect(mapStateToProps, mapDispatchToProps)(MyPatientsList);
