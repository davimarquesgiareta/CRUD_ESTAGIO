// Update with your config settings.

module.exports = {
    client: 'postgresql',
    connection: {
      database: 'crud',
      user:     'postgres',
      password: '0123efmn'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  

};
