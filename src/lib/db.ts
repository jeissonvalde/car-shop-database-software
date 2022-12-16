const Sequelize = require('sequelize')
let sequelize: any = {} // Important

export default function setupDatabase (config) {
  if (!sequelize.authenticate) {
    sequelize = new Sequelize(config)
  }
  return sequelize
}