const userModel = require('../models/users')
const response = require('../helpers/response')
const fs = require('fs')

exports.detailUserProfile = async (req, res) => {
  try {
    const { id } = req.params
    const results = await userModel.getUserProfileById(id)
    if (results.length > 0) {
      return response(res, 200, true, 'Details of User', results[0])
    }
    return response(res, 404, false, `User id ${id} not exists`)
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params
    const { firstname, lastname, phoneNumber, email } = req.body
    const dataProfile = {
      firstname: firstname,
      lastname: lastname,
      phoneNumber: phoneNumber,
      image: req.file === undefined ? null : req.file.filename
    }
    const user = {
      email: email
    }
    const initialResult = await userModel.getUserProfileById(id)
    if (initialResult.length > 0) {
      if (user.email) {
        if (dataProfile.image) {
          fs.unlink(`./uploads/users/${initialResult[0].image}`,
            function (err) {
              if (err) {
                console.log('image')
              }
              console.log('Image Update Old File deleted!')
            }
          )
        }
        await userModel.updateUser(id, user)
        await userModel.updateUserProfile(id, dataProfile)
        return response(res, 200, true, `User id ${id} updated successfully`, { ...dataProfile, ...user })
      }
    } else {
      return response(res, 200, false, `Failed to update user id ${id}`)
    }
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}
