var request = require('./request/github')

function readme(full_name, callback) {
  request({
    url: '/repos/' + full_name + '/readme',
    headers: {
      'Accept': 'application/vnd.github.v3.html'
    }
  }, function (err, response, body) {
    if (err) {
      return callback(err)
    }

    if (response.statusCode == 404) {
      return callback(null, '')
    }

    return callback(null, body)
  })
}

module.exports = readme
