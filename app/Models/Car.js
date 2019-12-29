'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Car extends Model {
  owner () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Car
