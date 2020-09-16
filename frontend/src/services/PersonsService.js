import axios from 'axios'

// const baseUrl = 'https://swapi.dev/api/people/';

const baseUrl = (process.env.NODE_ENV !== 'development') ?
    '/api/person' :
    '//localhost:5000/api/person';


const persons_key = 'persons';
var personsWithId = JSON.parse(localStorage.getItem(persons_key));

async function getPersons(filterBy = null) {
    let personsToReturn = await axios.get(`${baseUrl}`)
        .then(res => {
            return res.data
        })
    if (filterBy && filterBy.term) {
        personsToReturn = _filter(filterBy.term, personsToReturn)
    }
    return personsToReturn
}

async function getPerson(id) {
    const currPerson = await axios.get(`${baseUrl}/${id}`)
        .then(res => {
            return res.data
        })
    return currPerson;
}

async function removePerson(idToRemove) {
    try {
        const idx = await axios.delete(`${baseUrl}/${idToRemove}`)
            .then(res => {
                return res.data
            });
        return idx;
    } catch (err) {
        console.log(`ERROR: cannot remove person ${idToRemove}`);
        throw err;
    }
}

async function savePerson(personToAdd) {
    return personToAdd.id ? _updatePerson(personToAdd) : _addPerson(personToAdd)
}

async function _addPerson(personToAdd) {
    const person = await axios.post(`${baseUrl}`, personToAdd)
        .then(res => {
            return res.data
        });
    return person;
}
async function _updatePerson(personToupdate) {
    const person = await axios.put(`${baseUrl}/${personToupdate.id}`, personToupdate)
        .then(res => {
            return res.data
        });
    return person;
}
function _filter(term, personsToFilter) {
    term = term.toLocaleLowerCase()
    return personsToFilter.filter(person => {
        return person.name.toLocaleLowerCase().includes(term)// ||
        // contact.phone.toLocaleLowerCase().includes(term) ||
        // contact.email.toLocaleLowerCase().includes(term)
    })
}


// function sort(arr) {
//     return arr.sort((a, b) => {
//         if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
//             return -1;
//         }
//         if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
//             return 1;
//         }

//         return 0;
//     })
// }

export default {
    getPersons,
    getPerson,
    removePerson,
    savePerson
}

function _makeId(length = 10) {
    let txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}