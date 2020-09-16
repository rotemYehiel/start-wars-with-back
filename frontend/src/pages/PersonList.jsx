import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PersonFilter from '../components/PersonFilter';
import { loadPersons } from '../actions/AppAction';

class PersonList extends PureComponent {
    state = {
        filterBy: ''
    }
    componentWillMount() {
        this.loadPersons();
    }
    loadPersons = () => {
        this.props.loadPersons(this.state.filterBy);
    }
    onFilter = (filterBy) => {
        this.setState((prevState) => {
            return {
                filterBy: {
                    ...prevState.filterBy,
                    ...filterBy,
                },
            };
        }, this.loadPersons);
    }
    componentDidMount() {
        this.props.loadPersons(this.state.filterBy);
    }
    render() {
        const { persons } = this.props;
        if (!persons) {
            return (<div>no People</div>)
        } else {
            return (
                <div className="person-list">
                    <header className="list-header">People List</header>
                    <PersonFilter onFilter={this.onFilter} />
                    <ul className="person-list-ul">
                        {persons.map((person) => (
                            <Link to={`/Person/${person.id}`} key={person.id}>
                                <li className="person">{person.name}</li>
                            </Link>
                        ))}
                    </ul>
                    <button className="add-btn">
                        <Link to={'/PersonEdit/'} >
                            <li className="fas fa-plus"></li>
                        </Link>
                    </button>
                </div>
            )

        }
    }
}
const mapStateToProps = (state) => {
    return {
        persons: state.app.persons,
    }
}
const mapDispatchToProps = {
    loadPersons
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonList)

