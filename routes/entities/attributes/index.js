const attributes = require('express').Router({ mergeParams: true });
const remove = require('./remove');

attributes.delete('/:attr', remove);

module.exports = attributes;