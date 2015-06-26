var remo = require('remo');

module.exports = function(db, m, cb) {
  switch(m.action) {
    case 'set':
    case 'inc':
    case 'find':
    case 'drop':
    case 'multi':
    case 'unset':
    case 'count':
    case 'upsert':
    case 'remove':
    case 'insert':
    case 'create':
    case 'update':
    case 'findOne':
    case 'dropIndex':
    case 'createIndex':
    case 'dropDatabase':
    case 'findByObjectId':
    case 'updateByObjectId':
    case 'removeByObjectId':
      remo[m.action].apply(this, [db, m, cb]);
      break;
    default:
      cb('Non processable attempt');
      break;
  }
};
