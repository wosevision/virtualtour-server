const locations = require('express').Router();
const findByCode = require('../../utils/findByCode');

const all = require('./all');
const create = require('./create');
// const remove = require('./remove');
const single = require('./single');
const update = require('./update');

const compression = require('compression');
locations.use(compression());

locations.param('id', findByCode('Location'));

locations.route('/')
	//.get('north?', all)
	.get(all)
	.post(create);


locations.route('/:id')
	//.post(create)
	//.delete(remove)
	.get(single)
	.put(update);

module.exports = locations;