var request = require('request')

module.exports = function () {
  return request.defaults({
    baseUrl: 'https://api.github.com',
    headers: {
      'User-Agent': 'stars-tumblr',
      'Authorization': 'token ' + process.env.GITHUB_TOKEN
    }
  }).apply(this, arguments)
}
