import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';


class Alert extends React.Component {

    componentDidUpdate(prevProps) {
        const { message, alert } = this.props;
        if (message !== prevProps.message) {
            if (message.error)
                alert.error(message.error);
            else if (message.success)
                alert.success(message.success);
        }
    }

    // Renderless component
    render() {
        return <React.Fragment />
    }

}


Alert.propTypes = {
    message: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    message: state.messagesReducer,
});


export default connect(mapStateToProps)(withAlert()(Alert));
