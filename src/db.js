const knex = require('knex')

let knexInstance;

const init = async (config) => {
  if (!knexInstance) {
    knexInstance = knex(config);
    await knexInstance.migrate.latest(config.migrations);
  } 
}

const instance = () => {
  if (!knexInstance) {
    throw new Error('DB not initialized')
  }

  return knexInstance
}

module.exports = {
  init,
  instance,
}