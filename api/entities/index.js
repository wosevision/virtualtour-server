const entities = require('express').Router();
const findById = require('../../utils/findById');

const all = require('./all');
const create = require('./create');
const remove = require('./remove');
const single = require('./single');
const update = require('./update');

const attributes = require('./attributes');

const compression = require('compression');
entities.use(compression());

entities.param('id', findById('Entity'));

entities.route('/')
	.get(all)
	.post(create);

entities.route('/:id')
	.get(single)
	.post(create)
	.delete(remove)
	.put(update);
	
entities.use('/:id/attributes', attributes);

module.exports = entities;