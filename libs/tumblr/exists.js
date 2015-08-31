var Client = require('./')

var client = new Client()

function exists(repo, callback) {
  client.posts(Client.blog, {
    tag: 'starred-' + repo.id,
    offset: 0,
    limit: 1
  }, function (err, res) {
    if (err)
      return callback(err)
    callback(null, res.posts.length > 0)
  })
}

module.exports = exists
