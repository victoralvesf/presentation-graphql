'use strict'

const User = use('App/Models/User')
const Car = use('App/Models/Car')

const resolvers = {
  Query: {
    async availableCarsToRent() {
      try {
        const cars = await Car.query().where('quantityAvailable', '>', 0).fetch()

        return cars.toJSON()
      } catch(err) {
        throw new Error('Nao foi possivel realizar a busca, tente novamente.')
      }
    },

    async fetchCar(_, { id }) {
      try {
        const car = await Car.query().where({ id }).fetch()
        return car.toJSON()
      } catch(err) {
        throw new Error('Nenhum carro encontrado com o ID informado.')
      }
    },

    async fetchMyRentCars(_, { id }) {
      try {
        const myCars = await Car.query().where({ owner: id }).fetch()
        return myCars.toJSON()
      } catch(err) {
        throw new Error('Nenhum carro encontrado para o usuario informado.')
      }
    },
  },

  Mutation: {
    async login(_, { email, password }, { auth }) {
      try {
        const { token } = await auth.attempt(email, password)

        let { isAdmin } = await User.query().select('isAdmin').where({ email }).fetch()
        isAdmin = isAdmin ? isAdmin : false

        const response = {
          isAdmin: isAdmin,
          token: token
        }

        return response
      } catch(err) {
        throw new Error('Usuario nao encontrado')
      }


    },

    async createUser(_, { username, email, password }) {
      return await User.create({ username, email, password })
    },

    async addCar(_, {
      brand,
      model,
      year,
      image,
      country,
      pricePerDay,
      quantityAvailable,
    }, { auth }) {
      try {
        await auth.check()

        const user = await auth.getUser()

        const newCar = await Car.create({
          brand: brand,
          model: model,
          year: year,
          image: image,
          country: country,
          pricePerDay: pricePerDay,
          quantityAvailable: quantityAvailable,
          user_id: user.id
        })

        return newCar.toJSON()
      } catch(err) {
        console.log(err)
        throw new Error('Token JWT nao informado ou invalido')
      }
    }
  },

  Car: {
    async user (carInJson) {
      try {
        const car = new Car()
        car.newUp(carInJson)

        const user = await car.owner().fetch()
        return user.toJSON()
      } catch(err) {
        console.log(err)
        throw new Error('Usuario nao encontrado')
      }

    }
  }
}

module.exports = resolvers
