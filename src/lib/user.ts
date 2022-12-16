export default function setupUser (UserModel) {
  async function createOrUpdate (user) {
    const cond = {
      where: {
        uuid: user.uuid
      }
    }

    const existingUser = await UserModel.findOne(cond)

    if (existingUser) {
      const updated = await UserModel.update(user, cond)
      // return updated ? UserModel.findOne(cond) : existingUser
      return updated
    }

    const result = await UserModel.create(user)
    return result.toJSON()
  } // End createOrUpdate

  function findById (id) {
    return UserModel.findById(id)
  }

  function findByUuid (uuid) {
    return UserModel.findOne({
      where: {
        uuid
      }
    })
  }

  function findAll () {
    return UserModel.findAll()
  }

  function findConnected () {
    return UserModel.findAll({
      where: {
        connected: true
      }
    })
  }

  function findByUsername (username) {
    return UserModel.findAll({
      where: {
        username,
        connected: true
      }
    })
  }

  return {
    createOrUpdate,
    findById,
    findByUuid,
    findAll,
    findConnected,
    findByUsername
  }
}