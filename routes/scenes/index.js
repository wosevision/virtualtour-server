const scenes = require('express').Router();
const findByCode = require('../../utils/findByCode');

const all = require('./all');
const create = require('./create');
const remove = require('./remove');
const single = require('./single');
const update = require('./update');

scenes.param('id', findByCode('Scene'));

scenes.post('/', create);
// scenes.post('/:id', create);

scenes.delete('/:id', remove);

scenes.get('/', all);
scenes.get('/:id', single);

scenes.put('/:id', update);

module.exports = scenes;