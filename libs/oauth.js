var querystring = require('querystring')
var url = require('url')

var connect = require('connect')
var request = require('request')

var job = require('./job')

var REQUEST_TOKEN_URL = 'https://www.tumblr.com/oauth/request_token'
var AUTHORIZE_URL = 'https://www.tumblr.com/oauth/authorize'
var ACCESS_TOKEN_URL = 'https://www.tumblr.com/oauth/access_token'

var app = connect()

app.use(function (req, res, next) {

  if (req.method !== 'GET') {
    return next(405)
  }

  if (url.parse(req.url).pathname !== '/') {
    return next(404)
  }

  return next()

}).use(function (req, res, next) {

  var search = url.parse(req.url).search

  if (!search) {
    request.post({
      url: REQUEST_TOKEN_URL,
      oauth: {
        consumer_key: process.env.TUMBLR_CONSUMER_KEY,
        consumer_secret: process.env.TUMBLR_CONSUMER_SECRET
      }
    }, function (err, response, body) {
      if (err) {
        return next(err)
      }

      var query = querystring.parse(body)
      var authorize_full_url = AUTHORIZE_URL + '?' +
        querystring.stringify({ oauth_token: query.oauth_token })
      process.env.TUMBLR_REQUEST_SECRET = query.oauth_token_secret

      res.writeHead(302, { Location: authorize_full_url })

      return res.end()
    })

    return
  }

  return next()

}).use(function (req, res, next) {

  var query = url.parse(req.url, true).query
  if ('oauth_token' in query && 'oauth_verifier' in query) {
    request.post({
      url: ACCESS_TOKEN_URL,
      oauth: {
        consumer_key: process.env.TUMBLR_CONSUMER_KEY,
        consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
        token: query.oauth_token,
        token_secret: process.env.TUMBLR_REQUEST_SECRET,
        verifier: query.oauth_verifier
      }
    }, function (err, response, body) {
      if (err) {
        return next(err)
      }

      var query = querystring.parse(body)
      delete process.env.TUMBLR_REQUEST_SECRET
      process.env.TUMBLR_ACCESS_TOKEN = query.oauth_token
      process.env.TUMBLR_ACCESS_TOKEN_SECRET = query.oauth_token_secret

      res.writeHead(302, { Location: 'http://' + process.env.TUMBLR_BLOG })
      res.end()

      setImmediate(job)
    })

    return
  }

  return next()
}).use(function (req, res, next) {

  return next(400)

}).use(function (err, req, res, next) {

  if (typeof err == 'number') {
    res.statusCode = err
    res.end()
  } else {
    res.statusCode = 500
    res.end()
  }

})

module.exports = app
