var Tumblr = require('tumblr.js')

var name = require('../name')

module.exports = function Client() {
  return new Tumblr.Client(Client.credentials)
}
