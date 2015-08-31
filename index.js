try {
  require('./config')
} catch(e) {
  require('./libs/github').token = process.env.GITHUB_TOKEN
  require('./libs/tumblr').credentials = {
    consumer_key: process.env.TUMBLR_CONSUMER_KEY,
    consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
    token: process.env.TUMBLR_TOKEN,
    token_secret: process.env.TUMBLR_TOKEN_SECRET
  }
  require('./libs/tumblr').blog = process.env.TUMBLR_BLOG
}

var exists = require('./libs/tumblr/exists')
var starred = require('./libs/github/starred')
var readme = require('./libs/github/readme')
var post = require('./libs/tumblr/post')

starred(function (err, repo, date, next) {
  if (err)
    return console.error(err)

  exists(repo, function (err, exists) {
    if (err)
      return console.error(err)

    if (!exists)
      readme(repo, function (err, readme) {
        if (err && err.code != 404)
            return console.error(err)

        post(repo, date, readme, function (err) {
          if (err)
            return console.error(err)
          next()
        })
      })
  })
})
