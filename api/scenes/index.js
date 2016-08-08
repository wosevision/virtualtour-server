const scenes = require('express').Router();
const findByCode = require('../../utils/findByCode');

const all = require('./all');
const create = require('./create');
const remove = require('./remove');
const single = require('./single');
const update = require('./update');

const compression = require('compression');
scenes.use(compression());

scenes.param('id', findByCode('Scene'));

scenes.route('/')
	.get(all)
	.post(create);

scenes.route('/:id')
	//.post(create);
	.delete(remove)
	.get(single)
	.put(update);

module.exports = scenes;