const Joi = require('joi')
module.exports = {
  validationMovie: (movie) => {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      releaseDate: Joi.required(),
      directed: Joi.string().min(3).required(),
      duration: Joi.required(),
      casts: Joi.string().min(3).required(),
      description: Joi.exist(),
      idGenre: Joi.required()
    })
    return schema.validate(movie)
  },
  validationCinema: (cinema) => {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      location: Joi.string().min(3).required(),
      address: Joi.string().min(3).required(),
      price: Joi.required(),
      showtime: Joi.required()
    })
    return schema.validate(cinema)
  },
  validationGenre: (genre) => {
    const schema = Joi.object({
      name: Joi.string().min(3).required()
    })
    return schema.validate(genre)
  }
}
