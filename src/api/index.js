const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const posts = require('./posts')

module.exports = () => {
  const router = express.Router()
  
  router.use(bodyParser.json())
  process.env.NODE_ENV !== 'test' && router.use(morgan('dev'))

  router.use('/v1/posts', posts())

  router.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  return router;
}
