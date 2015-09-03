var request = require('./request/tumblr')

function exists(id, callback) {
  request({
    url: '/posts/link',
    qs: {
      tag: 'starred-' + id,
      limit: 0
    }
  }, function (err, response, body) {
    if (err) {
      return callback(err)
    }
    if (body.meta.status >= 300) {
      return callback(new Error(body.meta.msg))
    }
    var total_posts = body.response.total_posts
    return callback(null, total_posts > 0)
  })
}

module.exports = exists
