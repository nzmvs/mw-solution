const db = require('../db')

const get = (collection, filterColumn, filterValues) => {
  return filterColumn
    ? db.instance().table(collection).whereIn(filterColumn, filterValues)
    : db.instance().table(collection)
}

const update = (collection, idKey, idValue, data) => {
  return db.instance()
    .table(collection)
    .where(idKey, idValue)
    .update(data)
}

const remove = (collection, idKey, idValue) => {
  return db.instance()
    .table(collection)
    .where(idKey, idValue)
    .del()
}

module.exports = {
  get,
  update,
  remove,
}