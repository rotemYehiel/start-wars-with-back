import React, { PureComponent } from 'react'
import { connect } from 'react-redux';

import { savePerson, loadPerson } from '../actions/AppAction';

class PersonEdit extends PureComponent {
    state = {
        person: {
            id: '',
            name: '',
            height: '',
            mass: '',
            hair_color: '',
            skin_color: '',
            eye_color: '',
            birth_year: '',
            gender: '',
            // homeworld:'',
            // films: [],
            // species:[],
            // vehicles: [],
            // starships: [],
        }
    }
    // componentDidMount
    componentWillMount = async () => {
        const id = this.props.match.params.id;
        if (id) {
            await this.props.loadPerson(id)
            this.setState({ person: { ...this.props.currPerson } })
        }
    }

    savePerson = async (ev) => {
        ev.preventDefault();
        // console.log("person to save:", this.state.person)
        await this.props.savePerson(this.state.person)
        this.props.history.go(-1);

    }
    handleChange = (ev) => {
        ev.preventDefault();
        // console.log(ev.target.value)
        const { name, value } = ev.target;
        this.setState((prevState) => {
            return {
                person: {
                    ...prevState.person,
                    [name]: value
                },
            };
        });
    }
    render() {
        const { person } = this.state;
        return (
            <div className="edit-page">
                <h1>Add new person</h1>
                <form onSubmit={this.savePerson}>
                    <label>Enter a person name: </label>
                    <input
                        type="text"
                        placeholder="person Name"
                        name="name"
                        value={person.name}
                        onChange={this.handleChange}
                    />
                    <label>Enter height: </label>
                    <input
                        type="number"
                        placeholder="person height"
                        name="height"
                        value={person.height}
                        onChange={this.handleChange}
                    />
                    <label>Enter mass: </label>
                    <input
                        type="text"
                        placeholder="person mass"
                        name="mass"
                        value={person.mass}
                        onChange={this.handleChange}
                    />
                    <label>Enter hair color: </label>
                    <input
                        type="text"
                        placeholder="person hair color"
                        name="hair_color"
                        value={person.hair_color}
                        onChange={this.handleChange}
                    />
                    <label>Enter skin color: </label>
                    <input
                        type="text"
                        placeholder="person skin color"
                        name="skin_color"
                        value={person.skin_color}
                        onChange={this.handleChange}
                    />
                    <label>Enter eye color: </label>
                    <input
                        type="text"
                        placeholder="person eye color"
                        name="eye_color"
                        value={person.eye_color}
                        onChange={this.handleChange}
                    />
                    <label>Enter birth year: </label>
                    <input
                        type="text"
                        placeholder="person birth year"
                        name="birth_year"
                        value={person.birth_year}
                        onChange={this.handleChange}
                    />
                    <label>Select gender: </label>
                    <select name="gender" value={person.gender} onChange={this.handleChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <button>Save</button>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        currPerson: state.app.currPerson
    }
}
const mapDispatchToProps = {
    loadPerson,
    savePerson
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonEdit)