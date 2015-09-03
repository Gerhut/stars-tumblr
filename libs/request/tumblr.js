var request = require('request')

module.exports = function () {
  return request.defaults({
    baseUrl: 'https://api.tumblr.com/v2/blog/'
      + process.env.TUMBLR_BLOG,
    oauth: {
      consumer_key: process.env.TUMBLR_CONSUMER_KEY,
      consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
      token: process.env.TUMBLR_ACCESS_TOKEN,
      token_secret: process.env.TUMBLR_ACCESS_TOKEN_SECRET
    },
    json: true
  }).apply(this, arguments)
}
