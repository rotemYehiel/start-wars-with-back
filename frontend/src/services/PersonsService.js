import axios from 'axios'

const baseUrl = 'https://swapi.dev/api/people/';
const persons_key = 'persons';
var personsWithId = JSON.parse(localStorage.getItem(persons_key));


async function getPersons(filterBy = null) {
    var personsToReturn = [];
    if (localStorage.getItem(persons_key)) {
        personsToReturn = JSON.parse(localStorage.getItem(persons_key))
    } else {
        personsToReturn = await axios.get(`${baseUrl}`)
            .then(res => {
                return res.data.results;
            })
        personsToReturn = personsToReturn.map(person => {
            person.id = _makeId();
            return person
        })
        localStorage.setItem(persons_key, JSON.stringify(personsToReturn));
    }

    if (filterBy && filterBy.term) {
        personsToReturn = _filter(filterBy.term, personsToReturn)
    }
    personsWithId = JSON.parse(JSON.stringify(personsToReturn));
    return personsToReturn
}

async function getPerson(id) {
    const currPerson = await personsWithId.filter(person => {
        return (person.id === id)
    })
    return currPerson[0];
}

async function removePerson(idToRemove) {
    try {
        let persons = personsWithId;
        const idx = persons.findIndex(person => person.id === idToRemove)
        persons.splice(idx, 1)
        localStorage.setItem(persons_key, JSON.stringify(persons));
        return idx;
    } catch (err) {
        console.log(`ERROR: cannot remove person ${idToRemove}`);
        throw err;
    }
}

async function savePerson(personToAdd) {
    return personToAdd.id ? _updatePerson(personToAdd) : _addPerson(personToAdd)
}

function _addPerson(personToAdd) {
    personToAdd.id = _makeId();
    personToAdd.created = Date.now();
    let persons = personsWithId;
    persons.push(personToAdd);
    localStorage.setItem(persons_key, JSON.stringify(persons));
    return personToAdd;
}
function _updatePerson(personToupdate) {
    personToupdate.edited = Date.now();
    let persons = personsWithId;
    const idx = persons.findIndex(person => person.id === personToupdate.id)
    if (idx !== -1) {
        persons[idx] = personToupdate
    }
    localStorage.setItem(persons_key, JSON.stringify(persons));
    return personToupdate;
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