var Client = require('./')

var client = new Client()

function post(repo, date, readme, callback) {
  var data = {
    title: repo.name,
    url: repo.html_url,
    date: date,
    tags: 'starred,starred-' + repo.id,
  }
  if (readme)
    data.description = readme.replace(/~/g,
      function (char) {
        return '&#' + char.charCodeAt() + ';'
      })
  client.link(Client.blog, data, callback)
}

module.exports = post
