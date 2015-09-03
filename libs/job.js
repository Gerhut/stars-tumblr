var starred = require('./starred')
var exists = require('./exists')
var readme = require('./readme')
var post = require('./post')

function start(callback) {
  starred(function (err, repo, date, next) {
    if (err) return callback(err)

    exists(repo.id, function (err, result) {
      if (err) return callback(err)
      if (result) return next()

      readme(repo.full_name, function (err, content) {
        if (err) return callback(err)

        post({
          id: repo.id,
          title: repo.name,
          url: repo.html_url,
          date: date,
          description: content
        }, function (err) {
          if (err) return callback(err)
          return next()
        })
      })
    })
  })
}

function checkAndStart() {
  if ('TUMBLR_ACCESS_TOKEN' in process.env
    && 'TUMBLR_ACCESS_TOKEN_SECRET' in process.env) {
    start(console.error)
  } else {
    console.error('Unauthorized')
  }
}

module.exports = function () {
  checkAndStart()
  setInterval(checkAndStart, (process.env.INTERVAL || 60) * 60 * 1000)
}

