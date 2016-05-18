const locations = require('express').Router();
const findByCode = require('../../utils/findByCode');

const all = require('./all');
const create = require('./create');
// const remove = require('./remove');
const single = require('./single');
const update = require('./update');

locations.param('id', findByCode('Location'));

locations.post('/', create);
// locations.post('/:id', create);

// locations.delete('/:id', remove);

locations.get('/', all);
locations.get('/north?', all);
locations.get('/:id', single);

locations.put('/:id', update);

module.exports = locations;