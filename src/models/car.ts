const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

export default function setupAgentModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('car', {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    model: {
      type: Sequelize.NUMBER,
      allowNull: false
    },
    brand: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    reaction: {
      type: Sequelize.STRING,
      allowNull: false
    },
    stock: {
      type: Sequelize.NUMBER,
      allowNull: false
    }
  })
}