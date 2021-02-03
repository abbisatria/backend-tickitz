const userModel = require('../models/users')
const response = require('../helpers/response')
const fs = require('fs')
const bcrypt = require('bcrypt')

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
    const { firstname, lastname, phoneNumber, email, password } = req.body
    const initialResult = await userModel.getUsersById(id)
    if (initialResult.length > 0) {
      const dataProfile = {
        firstname: firstname === undefined ? initialResult[0].firstname : firstname,
        lastname: lastname === undefined ? initialResult[0].lastname : lastname,
        phoneNumber: phoneNumber === undefined ? initialResult[0].phoneNumber : phoneNumber,
        image: req.file === undefined ? initialResult[0].image : req.file.filename
      }
      let user
      if (email && password) {
        const salt = await bcrypt.genSalt()
        const encryptedPassword = await bcrypt.hash(password, salt)
        user = {
          email: email,
          password: encryptedPassword
        }
      } else if (password) {
        const salt = await bcrypt.genSalt()
        const encryptedPassword = await bcrypt.hash(password, salt)
        user = {
          password: encryptedPassword
        }
      } else if (email) {
        user = {
          email: email
        }
      }
      console.log(user)
      if (user !== undefined) {
        if (dataProfile.image !== initialResult[0].image) {
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
        return response(res, 200, true, `User id ${id} updated successfully`, {
          id: initialResult[0].id,
          email: user.email === undefined ? initialResult[0].email : user.email,
          role: initialResult[0].role,
          firstname: dataProfile.firstname,
          lastname: dataProfile.lastname,
          phoneNumber: dataProfile.phoneNumber,
          image: dataProfile.image
        })
      } else {
        if (dataProfile.image !== initialResult[0].image) {
          fs.unlink(`./uploads/users/${initialResult[0].image}`,
            function (err) {
              if (err) {
                console.log('image')
              }
              console.log('Image Update Old File deleted!')
            }
          )
        }
        await userModel.updateUserProfile(id, dataProfile)
        return response(res, 200, true, `User id ${id} updated successfully`, {
          id: initialResult[0].id,
          email: initialResult[0].email,
          role: initialResult[0].role,
          firstname: dataProfile.firstname,
          lastname: dataProfile.lastname,
          phoneNumber: dataProfile.phoneNumber,
          image: dataProfile.image
        })
      }
    } else {
      return response(res, 200, false, `Failed to update user id ${id}`)
    }
  } catch (error) {
    console.log(error)
    return response(res, 400, false, 'Bad Request')
  }
}
