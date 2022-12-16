const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

export default function setupMetricModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('user', {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}