const express = require('express');
const apiRouter = require('./api');

const init = () => {
  const app = express();

  app.get('/', async(req, res, next) => {
    res.send('Howdy? :)')
  })

  app.get('/_ping', async(req, res, next) => {
    res.sendStatus(200)
  })

  app.use('/api', apiRouter());

  module.exports.instance = () => app;
};

const instance = () => {
  throw new Error('Not initialized')
}

module.exports = {
  init,
  instance,
}
