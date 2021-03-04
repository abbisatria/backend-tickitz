const mailer = require('nodemailer')
const fs = require('fs')
const mustache = require('mustache')
const subsciberModel = require('../models/subscribers')
const path = require('path')
const { EMAIL_USER, EMAIL_PASS } = process.env

module.exports = async (url, subject, message) => {
  const template = fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8')

  const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  })

  const getSubscriberEmail = await subsciberModel.getAllSubscriber()
  const mapUser = getSubscriberEmail.map(item => item.email).join()
  const results = {
    url: url,
    subject: subject,
    message: message
  }

  const mailOptions = {
    from: EMAIL_USER,
    to: mapUser,
    subject: subject,
    html: mustache.render(template, { ...results })
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err
    console.log('Email sent: ' + info.response)
  })
}
