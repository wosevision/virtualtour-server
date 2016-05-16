const attributes = require('express').Router(); //{ mergeParams: true }
const getAttr = require('../../../utils/getAttr');

const all = require('./all');
const single = require('./single');
const remove = require('./remove');

attributes.param('attr', getAttr('attr'));

attributes.get('/', all);
attributes.get('/:attr', single);

attributes.delete('/:attr', remove);

module.exports = attributes;