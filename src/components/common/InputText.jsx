import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function InputText(props) {
    const { name, label, value, changeValue, icon, type, errorMessage } = props;
    const showDanger = errorMessage ? 'is-danger' : '';
    const hasIcon = icon ? 'has-icons-left' : '';
    return (
        <React.Fragment>
            <div className="columns is-centered">
                <div className="column is-half field">
                    <label className="label">{ label }</label>
                    <div className={`control ${hasIcon}`}>
                        <input className={`input ${showDanger}`} type={type} placeholder={label}
                                name={name} value={value} onChange={changeValue} />
                        {
                            icon ? 
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={icon} />
                                </span>
                                : undefined 
                        }
                    </div>
                </div>
            </div>
            {
                showDanger ? 
                    <div className="columns is-centered">
                        <p className="has-text-centered has-text-danger has-text-weight-bold">
                            { errorMessage }
                        </p>  
                    </div>
                : undefined
            }        
        </React.Fragment>
    );
}


InputText.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    changeValue: PropTypes.func.isRequired,
    icon: PropTypes.string,
    type: PropTypes.oneOf(['text', 'password']),
    errorMessage: PropTypes.string.isRequired,
};


InputText.defaultProps = {
    type: 'text',
};


export default InputText;
