import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'

import { loadPerson, removePerson } from '../actions/AppAction';

import AxiosHandlerCmp from '../components/AxiosHandlerCmp'

class PersonDetails extends PureComponent {
    state = {
        homeworld: '',
        personId: ''
    }
    componentWillMount() {
        const id = this.props.match.params.id;
        this.setState((prevState) => {
            return {
                ...prevState,
                personId: id
            };
        });
        this.props.loadPerson(id);
    }
    onGoBackClickHandler = () => {
        this.props.history.go(-1);
    }
    onRemoveClickHandler = async () => {
        console.log(this.state.personId)
        await this.props.removePerson(this.state.personId);
        this.props.history.go(-1);
    }
    // handelAxiosGet = async (url) => {
    //     const res = await axios.get(url)
    //     // .then(res => res.data)
    //     const data = res.data.name
    //     console.log("data:", data)
    //     return (data);
    // }
    render() {
        const { currPerson } = this.props;
        if (!currPerson) {
            return (<div>no person</div>)
        } else {
            return (
                <div className="person-details">
                    <h2>Name: {currPerson.name}</h2>
                    <section className="buttons-sec">
                        <button className="edit-btn">
                            <Link to={`/PersonEdit/${currPerson.id}`} >
                                <li className="fas fa-edit"></li>
                            </Link></button>
                        <button className="remove-btn fas fa-trash-alt" onClick={this.onRemoveClickHandler}></button>
                        <button className="go-back-btn fas fa-undo-alt" onClick={this.onGoBackClickHandler}></button>
                    </section>
                    <img className="person-img" src={`https://robohash.org/${currPerson.name}.png`} alt="" />
                    <section className="details-sec">
                        <p><span className="description">Height:</span> {currPerson.height}</p>
                        <p><span className="description">Mass:</span> {currPerson.mass}</p>
                        <p><span className="description">Hair color:</span> {currPerson.hair_color}</p>
                        <p><span className="description">Skin color:</span> {currPerson.skin_color}</p>
                        <p><span className="description">Eye color:</span> {currPerson.eye_color}</p>
                        <p><span className="description">Year of birth:</span> {currPerson.birth_year}</p>
                        <p><span className="description">gender:</span> {currPerson.gender}</p>
                        {(currPerson.homeworld) ? (<p><span className="description">His homeworld:</span> <AxiosHandlerCmp url={currPerson.homeworld} /></p>) : null}
                        {(currPerson.films) ? (<ul className="Films-list-ul"><span className="description">Films:</span>
                            {currPerson.films.map((film) => (
                                <li key={film} className="film">
                                    <AxiosHandlerCmp url={film} />
                                </li>
                            ))}
                        </ul>) : null}
                        {(currPerson.species) ? (<ul className="species-list-ul"><span className="description">Species:</span>
                            {currPerson.species.map((specie) => (
                                <li key={specie} className="specie">
                                    <AxiosHandlerCmp url={specie} />
                                </li>
                            ))}
                        </ul>) : null}
                        {(currPerson.vehicles) ? (<ul className="vehicles-list-ul"><span className="description">Vehicles:</span>
                            {currPerson.vehicles.map((vehicle) => (
                                <li key={vehicle} className="vehicle">
                                    <AxiosHandlerCmp url={vehicle} />
                                </li>
                            ))}
                        </ul>) : null}
                        {(currPerson.starships) ? (<ul className="starships-list-ul"><span className="description">Starships:</span>
                            {currPerson.starships.map((starship) => (
                                <li key={starship} className="starship">
                                    <AxiosHandlerCmp url={starship} />
                                </li>
                            ))}
                        </ul>) : null}
                        <p><span className="description">Created at:</span>  {moment(currPerson.created).format('LLL')}</p>
                        {(currPerson.edited) ? (<p><span className="description">Edited at:</span>  {moment(currPerson.edited).format('LLL')}</p>) : null}
                    </section>
                </div>
            )

        }
    }
}
const mapStateToProps = (state) => {
    return {
        currPerson: state.app.currPerson,
    }
}
const mapDispatchToProps = {
    loadPerson,
    removePerson
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails)

