import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addParameter } from '../../actions/measures';



class AddParameter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            unityMeasure: '',
        };
    }

    onChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    onClick = () => {
        this.props.addParameter(this.state);
        this.setState({
            name: '',
            unityMeasure: '',
        });
    }

    render() {
        return (
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th><abbr title="Nome">Nome</abbr></th>
                        <th><abbr title="Unità di Misura">Unità di Misura</abbr></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input className="input" type="text" name="name" value={this.state.name}
                                    onChange={this.onChange} />
                        </td>
                        <td>
                            <input className="input" type="text" name="unityMeasure"
                                    value={this.state.unityMeasure} onChange={this.onChange} />
                        </td>
                        <td>
                            <button className="button is-primary has-text-white" onClick={this.onClick}>
                                Aggiungi
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

}


AddParameter.propTypes = {
    addParameter: PropTypes.func.isRequired,
};


const mapDispatchToProps = {
    addParameter,
};


export default connect(null, mapDispatchToProps)(AddParameter);
