import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { retrieveMyDoctors, addDoctor } from '../../actions/doctors';
import { objectKeysFromSnakeCaseToCamelCase } from '../../utils/case';
import { tokenConfig } from '../../utils/http';


class SearchDoctors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            retrievedDoctors: [],
            searched: false,
        };
    }

    componentWillMount() {
        this.props.retrieveMyDoctors();
    }

    renderRetrievedDoctors = () => {
        const { retrievedDoctors, searched } = this.state;
        const { myDoctors } = this.props;
        if (searched && retrievedDoctors.length > 0) {
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
                            <th>Aggiungi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            retrievedDoctors.map((doctor, key) => {
                                const index = myDoctors.findIndex(d => d.code === doctor.code);
                                const addButton = index === -1 ?
                                                    <button className="button is-success has-text-white"
                                                        onClick={() => this.props.addDoctor(doctor.code)}>
                                                        Aggiungi
                                                    </button> : 
                                                    <button className="button has-background-grey-lighter disabled has-text-white">
                                                        Già selezionato
                                                    </button>
                                return (
                                    <tr key={key}>
                                        <td>{ doctor.firstName }</td>
                                        <td>{ doctor.lastName }</td>
                                        <td>{ doctor.email }</td>
                                        <td>{ doctor.city }</td>
                                        <td>{ doctor.province }</td>
                                        <td>{ doctor.region }</td>
                                        <td>{ doctor.doctorType }</td>
                                        <td>{ addButton }</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            );
        } else {
            if (searched) {
                return <h1>Non ho trovato nulla.</h1>
            } else {
                return undefined;
            }
        }
    }


    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    searchClick = () => {
        const { firstName, lastName } = this.state;
        const config = tokenConfig(this.props.token);
        console.log(firstName, lastName);
        axios
            .get(`http://localhost:8000/api/accounts/patient/search-doctors/?first-name=${firstName}&last-name=${lastName}`, config)
            .then(res => {
                const doctors = res.data.map(doc => objectKeysFromSnakeCaseToCamelCase(doc));
                this.setState({
                    searched: true,
                    retrievedDoctors: doctors,
                });
            });
    }

    render() {
        return (
            <Fragment>
                <div className="columns is-centered" style={{display: 'flex', flexDirection: 'row'}}>
                    <div className="field" style={{marginRight: 10}}>
                        <div className="control">
                            <input className="input" type="text" value={this.state.firstName}
                                    onChange={this.handleChange} name="firstName" placeholder="Nome" />
                        </div>
                    </div>
                    <div className="field" style={{marginRight: 10}}>
                        <div className="control">
                            <input className="input" type="text" value={this.state.lastName}
                                    onChange={this.handleChange} name="lastName" placeholder="Cognome" />
                        </div>
                    </div>
                    <button className="button is-success has-text-white" onClick={this.searchClick}>
                        Cerca
                    </button>
                </div>
                { this.renderRetrievedDoctors() }
            </Fragment>
        )
    }

}


SearchDoctors.propTypes = {
    token: PropTypes.string.isRequired,
    myDoctors: PropTypes.array.isRequired,
    addDoctor: PropTypes.func.isRequired,
    retrieveMyDoctors: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    token: state.authReducer.token,
    myDoctors: state.myDoctorsReducer.myDoctors,
});


const mapDispatchToProps = {
    addDoctor,
    retrieveMyDoctors,
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchDoctors);
