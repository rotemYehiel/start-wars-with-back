const initialState = {
    msg: 'hello world',
    persons: [],
    currPerson: '',
    filterBy: ''
}
export default function AppReducer(state = initialState, action) {
    // console.log("action:", action.currPerson)
    switch (action.type) {
        case 'SET_PERSONS':
            return {
                ...state,
                persons: action.persons
            }
        case 'SET_CURR_PERSON':
            return {
                ...state,
                currPerson: action.currPerson
            }
        case 'REMOVE_PERSON_BY_ID':
            return {
                ...state,
                persons: state.persons.splice(action.idxRemove, 1)
            }
        case 'ADD_PERSON':
            return {
                ...state,
                persons: [...state.persons, action.person]
            };
        case 'UPDATE_PERSON':
            return {
                ...state,
                persons: state.persons.map(person => {
                    return (person.id === action.person.id) ? action.person : person
                })
            }
        default:
            return state;
    }
}