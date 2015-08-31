var GitHub = require('github')

module.exports = function Client() {
  var client = new GitHub({
    version: '3.0.0',
    headers: { 'user-agent': 'stars-tumblr' }
  })
  client.authenticate({
    type: 'token',
    token: Client.token
  })

  return client
}
