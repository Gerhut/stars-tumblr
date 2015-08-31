var Client = require('./')

function starred(onStar) {
  var client = new Client()
  var nextPage = 1
  var allStars = []

  function next() {
    var star = allStars.shift()
    if (star != null) {
      setImmediate(onStar, null, star.repo, star.starred_at, next)
    } else if (nextPage) {
      request()
    }
  }

  function request() {
    client.repos.getStarred({
      page: nextPage++,
      headers: { 'Accept': 'application/vnd.github.v3.star+json' }
    }, function (err, stars) {
      if (!client.hasNextPage(stars))
        nextPage = false

      allStars.push.apply(allStars, stars)

      next()
    })
  }

  request()
}

module.exports = starred
