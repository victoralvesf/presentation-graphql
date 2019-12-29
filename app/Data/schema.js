'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
  type User {
    id: Int!
    username: String!
    email: String!
    isAdmin: Boolean
  }

  type Car {
    id: Int!
    brand: String!
    model: String!
    year: String
    image: String!
    country: String
    pricePerDay: String!
    quantityAvailable: Int!
    user: User!
  }

  type Login {
    isAdmin: Boolean!
    token: String!
  }

  type Query {
    availableCarsToRent: [Car]
    fetchCar(id: Int!): Car
    fetchMyRentCars(id: Int!): Car
  }

  type Mutation {
    login (
      email: String!,
      password: String!
    ): Login

    createUser (
      username: String!,
      email: String!,
      password: String!
    ): User

    addCar (
      brand: String!,
      model: String!,
      year: String,
      image: String!,
      country: String,
      pricePerDay: String!,
      quantityAvailable: Int!
    ): Car
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers})
