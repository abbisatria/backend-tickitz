const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/users')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname)

  if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    return cb(new Error('Only images are allowed'), 'test')
  }
  cb(null, true)
}

const limits = {
  fileSize: 1 * 1024 * 1024
}

const upload = multer({ storage: storage, limits: limits, fileFilter: fileFilter }).single('image')

const uploadFilter = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: err.message
      })
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error uploading file'
      })
    }
    next()
  })
}

module.exports = uploadFilter
