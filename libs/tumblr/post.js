var Client = require('./')

var client = new Client()

function post(repo, callback) {
  client.link(Client.blog, {
    slug: repo.id,
    date: repo.starred_at,
    format: 'markdown',
    title: repo.name,
    tags: 'starred',
    url: repo.html_url,
    description: repo.readme
  }, callback)
}

module.exports = post
