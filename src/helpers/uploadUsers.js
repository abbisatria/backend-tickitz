const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/users')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
   file.mimetype === 'image/jpg' ||
   file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const limits = {
  fileSize: 1 * 1024 * 1024
}

const upload = multer({ storage, limits, fileFilter }).single('image')

const uploadFilter = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.json({
        success: false,
        message: 'Error uploading file'
      })
    } else if (err) {
      return res.json({
        success: false,
        message: 'Error uploading file'
      })
    }
    next()
  })
}

module.exports = uploadFilter
