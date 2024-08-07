import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const PrivateRoute = ({ component: Component, auth, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            if (auth.isLoading || (auth.token && !auth.isAuthenticated)) {
                return <h2>Loading...</h2>;
            } else if (!auth.isAuthenticated) {
                return <Redirect to="/login-choice"/>;
            } else {
                return <Component {...props} />;
            }
        }}
    />
);


const mapStateToProps = state => ({
    auth: state.authReducer,
})


export default connect(mapStateToProps)(PrivateRoute);
