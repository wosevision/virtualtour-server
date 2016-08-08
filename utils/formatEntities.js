// iterable function to format a single entity,
// digs in a level and repeats if entity has children
function format(entities) {
	//console.log(entities);
	// var entitiesObj = {};
	var entitiesArr = []

	Object.keys(entities).forEach(function(key) {
		// pull data from entity
		var entity = entities[key];

		var type = entity.type || 'entity'; //`noent_${entity._id}`;
		var attrs = entity.attrs;
		var children = entity.entities;
		// init objects
		var newEntity = {};
		var attrsObj = {};

		// for each attr, make { prop: val, prop: val ... }
		Object.keys(attrs).forEach(function(a) {
			attrsObj[attrs[a].prop] = attrs[a].val || '';
		});
		// assign id attr from the objectId if there wasn't one specified
		attrsObj.id = entity._id;
		// if the entity has entities, dig in a level and repeat
		if (children) {
			//console.log(children);
			var childrenObj = format(children);
		}

		// make { entity: {attrs:..., entities:...} } and push to array
		newEntity = (Object.keys(childrenObj).length > 0) ? { type: type, attrs: attrsObj, entities: childrenObj } : { type: type, attrs: attrsObj};
		// entitiesObj[type] = (Object.keys(childrenObj).length > 0) ? { attrs: attrsObj, entities: childrenObj } : { attrs: attrsObj};
		entitiesArr.push(newEntity);

	});

	// return entitiesObj;
	return entitiesArr;
}

const formatEntities = function(data) {
	//console.log(data);
	var entities = format(data);
	//console.log(entities);
	return entities;
}

module.exports = formatEntities;