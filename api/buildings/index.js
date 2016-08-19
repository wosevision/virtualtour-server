const buildings = require('express').Router();
const findByCode = require('../../utils/findByCode');

const all = require('./all');
const create = require('./create');
const remove = require('./remove');
const single = require('./single');
const update = require('./update');

const compression = require('compression');
buildings.use(compression());

buildings.param('id', findByCode('Building'));

buildings.route('/')
	//.get('north?', all)
	.get(all)
	.post(create);


buildings.route('/:id')
	//.post(create)
	.delete(remove)
	.get(single)
	.put(update);

module.exports = buildings;