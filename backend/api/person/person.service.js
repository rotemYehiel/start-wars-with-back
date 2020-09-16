const axios = require('axios');
const persons = require('../../data/person.json');
const baseUrl = 'https://swapi.dev/api/people/';

module.exports = {
    query,
    getById,
    add,
    update,
    remove,
}

async function query(params = {}) {
    // const filterBy = _buildFilterCriteria(params);
    // const sortBy = _buildSortCriteria(params);
    // const collection = await dbService.getCollection('book');
    try {
        if (persons.length < 1) {
            const personsToAdd = await axios.get(`${baseUrl}`)
                .then(res => {
                    return res.data.results;
                })
            personsToAdd.forEach(person => {
                person.id = _makeId();
                persons.push(person);
            });
        }
        // const books = await collection.find(filterBy).collation({ locale: "en" }).sort(sortBy).toArray();
        return persons;
    } catch (err) {
        console.log('ERROR: cannot find persons');
        throw err;
    }
}

async function getById(personId) {
    console.log('personId in service:', personId)
    try {
        const person = await persons.find(person => {
            return person.id === personId
        });
        return person;
    } catch (err) {
        console.log(`ERROR: while finding person ${personId}`);
        throw err;
    }
}

async function add(person) {
    person.id = _makeId();
    person.created = Date.now();
    try {
        await persons.unshift(person);
        return person;
    } catch (err) {
        console.log(`ERROR: cannot insert person`);
        throw err;
    }
}

async function update(personToUpdate) {
    try {
        personToUpdate.edited = Date.now();
        const idx = await persons.findIndex(person => {
            return person.id = personToUpdate.id
        });
        persons[idx] = personToUpdate;
        return personToUpdate;
    } catch (err) {
        console.log(`ERROR: cannot update person ${person.id}`);
        throw err;
    }
}

async function remove(personId) {
    try {
        const idx = await persons.findIndex(person => {
            return person.id = personId
        });
        persons.splice(idx, 1)
        return idx;
    } catch (err) {
        console.log(`ERROR: cannot remove person ${personId}`);
        throw err;
    }
}

function _buildFilterCriteria(params) {
    const filterBy = {};
    if (params.name) {
        var regex = new RegExp(params.name, 'i');
        filterBy.name = { $regex: regex };
    }
    if (params.createdBy) {

    }
    if (params.type) {
        filterBy.type = params.type;
    }
    if (params.tag) {
        filterBy.tags = params.tag;
    }
    return filterBy;
}

function _buildSortCriteria(params) {
    const sortBy = { name: 1 };
    // const sortBy = {};
    // sortBy[params._sort] = +params._order;
    return sortBy;
}

function _makeId(length = 10) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}