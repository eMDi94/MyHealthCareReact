import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import './ApplicationNavbar.css';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { withRouter } from 'react-router-dom';

class ApplicationNavbar extends Component {

    constructor(props) {
        super(props);
        this.burgerToggler = React.createRef();
        this.menu = React.createRef();
    }

    toggleBurger = () => {
        this.burgerToggler.current.classList.toggle('is-active');
        this.menu.current.classList.toggle('is-active');
    };
    
    renderGuestMenu = () => {
        return (
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <Link to="/register"
                            className="button is-white has-text-primary has-text-weight-bold">
                            Registrati
                        </Link>
                        <Link to="/login-choice"
                            className="button is-white has-text-primary has-text-weight-bold">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    renderUserMenu = () => {
        const { logout, fullName } = this.props;
        return (
            <Fragment>
                <div className="navbar-start navbar-menu-left">
                    <Link className="navbar-item" to="/dashboard">
                        Dashboard
                    </Link>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <h1 className="name">Bentornato, { fullName() }</h1>
                    </div>
                    <div className="navbar-item">
                        <div className="buttons">
                            <button className="button is-white has-text-primary has-text-weight-bold"
                                    onClick={() => logout()}>
                                Logout        
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    render() {
        const { isAuthenticated } = this.props;
        return (
            <nav className="navbar is-primary navbar-padding has-shadow" role="navigation"
                    aria-label="main navigation">
                <div className="navbar-brand navbar-brand-margin">
                    <Link to="/" className="navbar-link-react">
                        <div className="navbar-brand-direction">
                            <img src={Logo} width="75" alt="Logo Not Found" />
                            <h1 className="is-hidden-mobile">MyHealthCare</h1>
                        </div>
                    </Link>
                    <span role="button" className="navbar-burger burger burger-height nav-toggle" 
                        aria-label="menu" aria-expanded="false" data-target="menu"
                        ref={this.burgerToggler} onClick={this.toggleBurger}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </span>
                </div>
                <div className="navbar-menu" ref={this.menu}>
                    {
                        isAuthenticated ? this.renderUserMenu() : this.renderGuestMenu()
                    }
                </div>
            </nav>
        );
    }

}


ApplicationNavbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    fullName: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    fullName: () => `${state.authReducer.user.firstName} ${state.authReducer.user.lastName}`,
});


const mapDispatchToProps = {
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ApplicationNavbar));
