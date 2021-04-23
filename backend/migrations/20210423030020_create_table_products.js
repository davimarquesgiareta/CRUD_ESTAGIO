
exports.up = function(knex) {
  return knex.schema.createTable('products',table =>{
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('description',1000)
      table.float('price').notNull()
      table.integer('quantity').notNull()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('products')
};
