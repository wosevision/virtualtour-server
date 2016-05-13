const entities = require('express').Router();

const attributes = require('./attributes');

const findById = require('../../utils/findById');
const all = require('./all');
const create = require('./create');
const remove = require('./remove');
const single = require('./single');
const update = require('./update');

entities.param('id', findById('entity'));

entities.post('/', create);
entities.post('/:id', create);

entities.delete('/:id', remove);

entities.get('/', all);
entities.get('/:id', single);

entities.put('/:id', update);

entities.use('/:id/attributes', attributes);

module.exports = entities;