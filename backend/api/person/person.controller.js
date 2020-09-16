const personService = require('./person.service')

module.exports = {
    query,
    getById,
    add,
    update,
    remove
}

async function query(req, res) {
    const persons = await personService.query(req.query)
    res.json(persons)
}

async function getById(req, res) {
    const person = await personService.getById(req.params.id)
    res.json(person)
}

async function add(req, res) {
    const person = req.body;
    await personService.add(person)
    res.json(person)
}

async function update(req, res) {
    console.log('update person?:', req.body)
    const person = req.body;
    await personService.update(person)
    res.json(person)
}

async function remove(req, res) {
    await personService.remove(req.params.id)
    res.end()
}