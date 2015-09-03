var request = require('./request/tumblr')

function post(options, callback) {
  var form = {
    type: 'link',
    title: options.title,
    url: options.url,
    date: options.date,
    tags: 'starred,starred-' + options.id,
    description: options.description || ''
  }

  form.description = form.description.replace(
    /~/g, function (char) {
      return '&#' + char.charCodeAt() + ';'
    })

  request({
    url: '/post',
    method: 'POST',
    form: form
  }, function (err, response, body) {
    if (err) {
      return callback(err)
    }
    if (body.meta.status >= 300) {
      return callback(new Error(body.meta.msg))
    }
    callback(null)
  })
}

module.exports = post
