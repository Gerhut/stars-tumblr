var Client = require('./')

var client = new Client()

function recent(callback) {
  client.posts(Client.blog, {
    tag: 'starred',
    offset: 0,
    limit: 1
  }, function (err, res) {
    if (err)
      return callback(err)

    var recent_post = res.posts[0]
    callback(null, recent_post && recent_post.slug)
  })
}

module.exports = recent
