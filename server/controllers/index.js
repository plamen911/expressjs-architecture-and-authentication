const homeController = require('./home-controller')
const usersController = require('./users-controller')
const articlesController = require('./articles-controller')
const adminController = require('./admin-controller')

module.exports = {
  home: homeController,
  users: usersController,
  articles: articlesController,
  admin: adminController
}
