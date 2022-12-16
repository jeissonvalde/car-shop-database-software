export default function setupCar (CarModel, UserModel) {
  async function findByUserUuid (uuid) {
    return CarModel.findAll({
      attributes: [ 'type' ],
      group: [ 'type' ],
      include: [{
        attributes: [],
        model: CarModel,
        where: {
          createdBy: uuid // Before where: { uuid },
        }
      }],
      raw: true
    })
  }

  async function create (uuid, car) {
    const user = await UserModel.findOne({
      where: { uuid }
    })

    if (user) {
      Object.assign(car, { createdBy: user.id })
      const result = await CarModel.create(car)
      return result.toJSON()
    }
  }

  async function findAllByBrand (brand) {
    return CarModel.findAll({
      where: {
        brand
      }
    })
  }

  return {
    create,
    findByUserUuid,
    findAllByBrand
  }
}