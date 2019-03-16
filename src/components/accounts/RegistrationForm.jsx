import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { patientRegistration } from '../../actions/auth';
import InputText from '../common/InputText';
import './Form.css';


class RegistrationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fiscalCode: '',
            firstName: '',
            lastName: '',
            city: '',
            province: '',
            region: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
        const errors = {};
        Object.keys(this.state).forEach(value => {
            const errorState = `${value}ErrorMessage`;
            Object.assign(errors, {
                [errorState]: '',
            });
        });
        Object.assign(this.state, errors);
        this.validationSchema = yup.object().shape({
            firstName: yup.string().required(),
            lastName: yup.string().required(),
            city: yup.string().required(),
            province: yup.string().required(),
            region: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().min(8).max(32).required(),
        });
    }

    handleChange = e => {
        const { name, value } = e.target;
        const fieldErrorName = `${name}ErrorMessage`;
        this.setState({
            [name]: value,
            [fieldErrorName]: '',
        });
    }

    renderRegistrationForm() {
        return (
            <React.Fragment>
                <div className="columns is-centered">
                    <h1 className="form-title is-half">Registrazione</h1>
                </div>
                <InputText name="firstName" label="Nome" value={this.state.firstName} 
                            changeValue={this.handleChange} errorMessage={this.state.firstNameErrorMessage} />
                <InputText name="lastName" label="Cognome" value={this.state.lastName} 
                            changeValue={this.handleChange} errorMessage={this.state.lastNameErrorMessage} />
                <InputText name="city" label="Città" value={this.state.city}
                            changeValue={this.handleChange} errorMessage={this.state.cityErrorMessage} />
                <InputText name="province" label="Provincia" value={this.state.province}
                            changeValue={this.handleChange} errorMessage={this.state.provinceErrorMessage} />
                <InputText name="region" label="Regione" value={this.state.region}
                            changeValue={this.handleChange} errorMessage={this.state.regionErrorMessage} />
                <InputText name="email" label="Email" value={this.state.email} changeValue={this.handleChange}
                            errorMessage={this.state.emailErrorMessage} />
                <InputText name="password" type="password" label="Password" value={this.state.password} 
                            changeValue={this.handleChange} errorMessage={this.state.passwordErrorMessage} />
                <InputText name="confirmPassword" type="password" label="Conferma Password" value={this.state.confirmPassword} 
                            changeValue={this.handleChange} errorMessage={this.state.confirmPasswordErrorMessage} />
                <div className="columns is-centered">
                    <button
                        className="button is-medium is-primary has-text-white has-text-weight-bold margin-bottom"
                        onClick={this.sendRegistration} >
                        Invia Registrazione!
                    </button>
                </div>
            </React.Fragment>
        );
    }

    sendRegistration = () => {
        this.validationSchema.validate(this.state, {abortEarly: false})
            .then(() => {
                if (this.state.password !== this.state.confirmPassword) {
                    this.setState({
                        confirmPasswordErrorMessage: 'La conferma della password non corrisponde.',
                    });
                } else {
                    const { firstName, lastName, city, province, region, email, password } = this.state;
                    this.props.performRegistration(firstName, lastName, city, province,
                                                    region, email, password);
                }
            })
            .catch(err => {
                const stateError = {};
                err.inner.forEach(innErr => {
                    const { path, message } = innErr;
                    const errorKey = `${path}ErrorMessage`;
                    Object.assign(stateError, {
                        [errorKey]: message,
                    });
                });
                this.setState(stateError);
            });
    }

    render() {
        const { isAuthenticated } = this.props;
        if (isAuthenticated) {
            return <Redirect to="/dashboard" />;
        } else {
            return this.renderRegistrationForm();
        }
    }
}


RegistrationForm.propTypes = {
    performRegistration: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});


const mapDispatchToProps = {
    performRegistration: patientRegistration,
};


export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
