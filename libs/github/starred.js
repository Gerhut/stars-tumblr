var inherits = require('util').inherits
var EventEmitter = require('events').EventEmitter

var Client = require('./')

function Starred(since) {
  this.since = +since
}

inherits(Starred, EventEmitter)

Starred.prototype.run = function run() {
  if (this.listeners('repo').length == 0)
    return

  var client = new Client()

  var since = this.since
  this.since = NaN

  var request = function (page) {
    client.repos.getStarred({
      page: page,
      headers: {
        'Accept': 'application/vnd.github.v3.star+json'
      }
    }, function (err, stars) {
      if (err)
        return this.emit('error', err)

      if (isNaN(this.since) && stars.length > 0)
        this.since = stars[0].repo.id

      var met = stars.some(function (star) {
      var repo = star.repo
      repo.starred_at = star.starred_at
      if (repo.id == since)
        return true
      else
        this.emit('repo', repo)
      }.bind(this))

      if (!met && client.hasNextPage(stars) && this.listeners('repo').length)
        request(page + 1)
      else
        this.emit('end')
    }.bind(this))
  }.bind(this)

  request(1)

  return this
}

module.exports = Starred
