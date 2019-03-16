import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MetroSpinner } from 'react-spinners-kit';
import { connect } from 'react-redux';
import { deleteDoctor, retrieveMyDoctors } from '../../actions/doctors';


class MyDoctorsList extends Component {

    componentWillMount() {
        this.props.retrieveMyDoctors();
    }


    render() {
        const { doctorsLoading } = this.props;
        if (doctorsLoading === true) {
            return <MetroSpinner size={30} />;
        } else {
        const { doctors } = this.props;
            return (
                <table className="table is-fullwidth is-striped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Email</th>
                            <th>Città</th>
                            <th>Provincia</th>
                            <th>Regione</th>                            
                            <th>Tipologia</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doc, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{doc.firstName}</td>
                                        <td>{doc.lastName}</td>
                                        <td>{doc.email}</td>
                                        <td>{doc.city}</td>
                                        <td>{doc.province}</td>
                                        <td>{doc.region}</td>
                                        <td>{doc.doctorType}</td>
                                        <td>
                                            <button className="button is-danger has-text-white"
                                                    onClick={() => this.props.deleteDoctor(doc.userCode)}>
                                                Rimuovi        
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            );
        }
    }
}


MyDoctorsList.propTypes = {
    doctors: PropTypes.array.isRequired,
    retrieveMyDoctors: PropTypes.func.isRequired,
    deleteDoctor: PropTypes.func.isRequired,
    doctorsLoading: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
    doctors: state.myDoctorsReducer.myDoctors,
    doctorsLoading: state.myDoctorsReducer.doctorsLoading,
});


const mapDispatchToProps = {
    retrieveMyDoctors,
    deleteDoctor,
};


export default connect(mapStateToProps, mapDispatchToProps)(MyDoctorsList);
