const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const requiredValidationMessage = '{PATH} is required'

let userSchema = mongoose.Schema({
  username: { type: String, required: requiredValidationMessage, unique: true },
  firstName: { type: String, required: requiredValidationMessage },
  secondName: { type: String, required: requiredValidationMessage },
  salt: String,
  hashedPass: String,
  roles: [String]
})

userSchema.method({
  authenticate: (password) => {
    if (encryption.generateHashedPassword(this.salt, password) === this.hashedPass) {
      return true
    } else {
      return false
    }
  }
})

let User = mongoose.model('User', userSchema)

module.exports.seedAdminUser = () => {
  User.find({}).then((users) => {
    if (users.length > 0) return

    let salt = encryption.generateSalt()
    let hashedPass = encryption.generateHashedPassword(salt, 'password')
    User.create({
      username: 'admin',
      firstName: 'Plamen',
      lastName: 'Markov',
      salt: salt,
      hashedPass: hashedPass,
      roles: ['Admin']
    })
  })
}
