module.exports = {
  client: "postgresql",
  migrations: {
    directory: `${__dirname}/migrations`,
  },
  connection: {
    database: 'impacter-posts-dev',
    host: '0.0.0.0',
    port: 5435,
    user: 'dev',
    password: 'dev',
  }
};
