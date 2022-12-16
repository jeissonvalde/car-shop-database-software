// Lib and models
import setupDatabase from './lib/db'
import setupUserModel from './models/user'
import setupCarModel from './models/car'
import setupUser from './lib/user'
import setupCar from './lib/car'
import defaults from 'defaults'

export default async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabase(config)
  const UserModel = setupUserModel(config)
  const CarModel = setupCarModel(config)

  // Relations
  UserModel.hasMany(CarModel)
  CarModel.belongsTo(UserModel)

  try {
    await sequelize.authenticate()
    console.log('--- SQLITE Connected ---')
  } catch(err) {
    return new Error(JSON.stringify(err))
  }

  const User = setupUser(UserModel)
  const Car = setupCar(CarModel, UserModel)

  /* Example
  Car.create('user-id-2022', {
    name: 'micarrito',
    model: 2023,
    brand: 'chevrolet',
    description: 'Este es mi carrito model 2023 viajar.',
    stock: 100
  }) */

  if (config.setup) {
    return await sequelize.sync({ force: true })
  }

  return {
    User,
    Car
  }
}