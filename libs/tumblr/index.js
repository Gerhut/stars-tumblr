var Tumblr = require('tumblr.js')

module.exports = function Client() {
  return new Tumblr.Client(Client.credentials)
}
