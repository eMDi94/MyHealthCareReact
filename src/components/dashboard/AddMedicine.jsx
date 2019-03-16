import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMedicine } from '../../actions/medicines';


class AddMedicine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            quantity: undefined,
            unity: '',
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    submit = () => {
        const { addMedicine } = this.props;
        addMedicine(this.state);
        this.setState({
            name: '',
            quantity: '',
            unity: '',
        });
    }

    render() {
        return (
            <table className="table is-striped is-fullwidth" style={{marginBottom: 25}}>
                <thead>
                    <tr>
                        <th><abbr title="Nome">Nome</abbr></th>
                        <th><abbr title="Quantità">Quantità</abbr></th>
                        <th><abbr title="Misura">Misura</abbr></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input className="input" type="text" name="name" value={this.state.name}
                                    onChange={this.handleChange} />
                        </td>
                        <td>
                            <input className="input" type="text" name="quantity" value={this.state.quantity}
                                    onChange={this.handleChange} />
                        </td>    
                        <td>
                            <input className="input" type="text" name="unity" value={this.state.unity}
                                    onChange={this.handleChange} />
                        </td>
                        <td>
                            <button className="button is-primary has-text-white"
                                onClick={this.submit}>
                                Aggiungi
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}


AddMedicine.propTypes = {
    addMedicine: PropTypes.func.isRequired,
};


const mapDispatchToProps = {
    addMedicine,
};


export default connect(null, mapDispatchToProps)(AddMedicine);
