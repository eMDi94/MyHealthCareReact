import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as yup from 'yup';
import InputText from '../common/InputText';
import { login } from '../../actions/auth';
import './Form.css';


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailErrorMessage: '',
            passwordErrorMessage: '',
        };
        this.validationSchema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required(),
        });
    }

    renderLoginForm() {
        const { match } = this.props;
        const { emailErrorMessage, passwordErrorMessage } = this.state;
        const patientLogin = match.params.loginType === 'patient-login';
        const additionalMessage = patientLogin ? (
            <div className="columns is-centered margin-message">
                <p className="has-text-black">
                    Non sei ancora registrato? <Link to="/register">Registrati!</Link>
                </p>
            </div>
        ) : undefined;
        return (
            <React.Fragment>
                <div className="columns is-centered" style={{marginTop: 15}}>
                    <h1 className="is-half form-title">Login</h1>
                </div>
                <InputText label="Email" value={this.state.email} changeValue={this.handleChange}
                            icon="envelope" errorMessage={emailErrorMessage} name="email" />
                <InputText label="Password" value={this.state.password} changeValue={this.handleChange}
                            icon="lock" errorMessage={passwordErrorMessage} name="password" type="password" />
                <div className="columns is-centered">
                    <button className="button is-primary is-medium has-text-weight-bold"
                            onClick={this.login}>
                        Login
                    </button>
                </div>
                { additionalMessage }
            </React.Fragment>
        );
    }

    render() {
        const { isAuthenticated } = this.props;
        if (isAuthenticated) {
            return <Redirect to="/dashboard"/>;
        } else {
            return this.renderLoginForm();
        }
    }

    login = () => {
        this.validationSchema.validate(this.state, {abortEarly: false})
            .then(() => {
                const { email, password } = this.state;
                const { match } = this.props;
                const loginType = match.params.loginType === 'patient-login' ? 'PatientLogin' : 'DoctorLogin';
                this.props.performLogin(email, password, loginType);
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

    handleChange = (e) => {
        const { name, value } = e.target;
        const fieldErrorName = `${name}ErrorMessage`;
        this.setState({
            [name]: value,
            [fieldErrorName]: '',
        });
    }
}


LoginForm.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    performLogin: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});


const mapDispatchToProps = {
    performLogin: login,
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
