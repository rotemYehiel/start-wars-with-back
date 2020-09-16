import PersonsService from '../services/PersonsService'

export function loadPersons(filterBy) {
    return async dispatch => {
        const persons = await PersonsService.getPersons(filterBy);
        dispatch({ type: 'SET_PERSONS', persons })
    }
}

export function loadPerson(id) {
    return async dispatch => {
        const currPerson = await PersonsService.getPerson(id);
        dispatch({ type: 'SET_CURR_PERSON', currPerson })
    }
}
export function removePerson(id) {
    return async dispatch => {
        const idxRemove = await PersonsService.removePerson(id);
        dispatch({ type: 'REMOVE_PERSON_BY_ID', idxRemove })
    }
}
export function savePerson(personToAdd) {
    return async dispatch => {
        const person = await PersonsService.savePerson(personToAdd);
        if (personToAdd.id) {
            dispatch({ type: 'UPDATE_PERSON', person })
        } else {
            dispatch({ type: 'ADD_PERSON', person })
        }
    }
}