var url = require('url')

var request = require('./request/github')

function starred(onStar) {
  var nextLink = '/user/starred'
  var allStars = []
  var options = {
    headers: {
      'Accept': 'application/vnd.github.v3.star+json'
    },
    json: true
  }

  function next() {
    var star = allStars.shift()
    if (star != null) {
      setImmediate(onStar, null, star.repo, star.starred_at, next)
    } else if (nextLink) {
      fetch()
    }
  }

  function fetch() {
    options.url = nextLink
    if (nextLink.indexOf('://') !== -1) {
      options.baseUrl = null
    } else {
      delete options.baseUrl
    }

    request(options, function (err, response, body) {
      if (err) {
        return onStar(err)
      }
      var link = response.headers.link
      var match = link.match(/<(.+?)>; rel="next"/)
      nextLink = match ? match[1] : null
      allStars.push.apply(allStars, body)

      next()
    })
  }

  fetch()
}

module.exports = starred
