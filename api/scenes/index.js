const scenes = require('express').Router();
const findById = require('../../utils/findById');
const findByCode = require('../../utils/findByCode');

const all = require('./all');
const create = require('./create');
const remove = require('./remove');
const single = require('./single');
const update = require('./update');

const compression = require('compression');
scenes.use(compression());

scenes.param('id', findById('Scene'));
scenes.param('code', findByCode('Scene'));

scenes.route('/')
	.get(all)
	.post(create);

scenes.route('/:code')
	//.post(create);
	.delete(remove)
	.get(single)
	.put(update);

module.exports = scenes;