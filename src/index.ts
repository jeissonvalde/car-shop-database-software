// Lib and models
import setupDatabase from './lib/db'
import setupUser from './lib/user'
import setupUserModel from './models/user'
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

  try {
    await sequelize.authenticate()
    console.log('--- SQLITE Connected ---')
  } catch(err) {
    return new Error(JSON.stringify(err))
  }

  const User = setupUser(UserModel)

  if (config.setup) {
    return await sequelize.sync({ force: true })
  }

  return {
    User
  }
}