const express = require('express')
const server = require('./src/server')
const db = require('./src/db')
const config = require('./knexfile')

const run = async () => {
  await db.init(config)
  server.init()
  server.instance().listen(3000, () => console.log('Server is live'))
}

run()
