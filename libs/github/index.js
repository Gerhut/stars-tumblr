var GitHub = require('github')

var name = require('../name')

module.exports = function Client() {
  var client = new GitHub({
    debug: process.env.NODE_ENV != 'production',
    version: '3.0.0',
    headers: { 'user-agent': name }
  })
  client.authenticate({
    type: 'token',
    token: Client.token
  })

  return client
}
