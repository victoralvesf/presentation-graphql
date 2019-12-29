'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarSchema extends Schema {
  up () {
    this.create('cars', (table) => {
      table.increments()
      table.string('brand').notNullable()
      table.string('model').notNullable()
      table.string('year')
      table.string('image').notNullable()
      table.string('country')
      table.string('pricePerDay').notNullable()
      table.integer('quantityAvailable').notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.timestamps()
      table.foreign('user_id').references('id').inTable('users')
    })
  }

  down () {
    this.drop('cars')
  }
}

module.exports = CarSchema
