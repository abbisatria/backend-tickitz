const userModel = require('../models/users')
const response = require('../helpers/response')
const validation = require('../helpers/validation')
const sendEmail = require('../helpers/sendEmail')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { APP_KEY, APP_URL } = process.env

exports.login = async (req, res) => {
  const valid = validation.validationUser(req.body)

  if (valid.error) {
    return response(res, 400, false, valid.error.details[0].message)
  }
  try {
    const { email, password } = req.body
    const existingUser = await userModel.getUsersByCondition({ email })
    if (existingUser.length > 0) {
      if (existingUser[0].status !== 'pending') {
        const compare = bcrypt.compareSync(password, existingUser[0].password)
        if (compare) {
          const { id, role } = existingUser[0]
          const token = jwt.sign({ id, role }, APP_KEY)
          const results = {
            token: token,
            role: existingUser[0].role
          }
          return response(res, 200, true, 'Login succesfully', results)
        } else {
          return response(res, 401, false, 'Wrong password')
        }
      } else {
        return response(res, 401, false, 'Unverified email')
      }
    }
    return response(res, 401, false, 'Email not registered')
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.register = async (req, res) => {
  const valid = validation.validationUser(req.body)

  if (valid.error) {
    return response(res, 400, false, valid.error.details[0].message)
  }
  try {
    const { email, password } = req.body
    const isExists = await userModel.getUsersByCondition({ email })
    if (isExists.length < 1) {
      const salt = await bcrypt.genSalt()
      const encryptedPassword = await bcrypt.hash(password, salt)
      const createUser = await userModel.createUser({ email, password: encryptedPassword, role: 2, status: 'pending' })
      await userModel.createUserProfile({ idUser: createUser.insertId })
      if (createUser.insertId > 0) {
        sendEmail(createUser.insertId, `${APP_URL}auth/verification/${createUser.insertId}`, 'Verify Email Address', "Thanks for signing up for Tickitz! We're excited to have you as an early user.")
        return response(res, 200, true, 'Register Success, Please verification email!')
      } else {
        return response(res, 400, false, 'Register Failed')
      }
    } else {
      return response(res, 400, false, 'Register Failed, email already exists')
    }
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.verificationEmail = async (req, res) => {
  try {
    const { id } = req.params
    if (id) {
      const update = await userModel.updateStatusUser(id)
      console.log(update)
      return res.redirect('https://tickitz-react.netlify.app/sign-in')
    }
    return response(res, 400, false, 'Failed email verification')
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const existingUser = await userModel.getUsersByCondition({ email })
    if (existingUser.length > 0) {
      sendEmail(existingUser[0].id, `https://tickitz-react.netlify.app/forgot-password/${existingUser[0].id}`, 'Reset Password', 'To reset your password, click the following link and follow the instructions.')
      return response(res, 200, true, 'Please check email to reset password!')
    }
    return response(res, 401, false, 'Email not registered')
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const { id } = req.params
    const password = req.body
    const salt = await bcrypt.genSalt()
    const encryptedPassword = await bcrypt.hash(password.password, salt)
    const update = await userModel.updateUser(id, { password: encryptedPassword })
    if (update.affectedRows > 0) {
      return response(res, 200, true, 'Reset Password Success')
    }
    return response(res, 400, false, 'Failed reset password')
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}
