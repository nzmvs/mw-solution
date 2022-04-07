const db = require('../src/db')
const server = require('../src/server')
const config = require('../knexfile')

let env

beforeEach(async () => {
  env = process.env.NODE_ENV
  process.env.NODE_ENV = 'test'
  await db.init(config)
  server.init()
})

afterEach(() => {
  process.env.NODE_ENV = env
})
