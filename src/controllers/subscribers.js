const response = require('../helpers/response')
const subscriberModel = require('../models/subscribers')

exports.createSubscriber = async (req, res) => {
  try {
    const { email } = req.body
    const isExists = await subscriberModel.getSubscriberByCondition({ email })
    if (isExists.length < 1) {
      const results = await subscriberModel.createSubscriber({ email })
      if (results.affectedRows > 0) {
        const finalResult = await subscriberModel.getSubscriberByCondition({ id: results.insertId })
        if (finalResult.length > 0) {
          return response(res, 200, true, 'Congratulations on your subscription to Tickitz', finalResult[0])
        }
        return response(res, 400, false, 'Subscribe Failed')
      }
    } else {
      return response(res, 400, false, 'Subscribe Failed, email already exists')
    }
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}
