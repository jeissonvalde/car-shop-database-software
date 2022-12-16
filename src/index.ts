// Lib and models
import setupDatabase from './lib/db'
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

  try {
    await sequelize.authenticate()
    console.log('Connected')
  } catch(err) {
    return new Error(JSON.stringify(err))
  }

  if (config.setup) {
    return await sequelize.sync({ force: true })
  }
}