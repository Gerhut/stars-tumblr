var Client = require('./')

var client = new Client()

function readme(repo, callback) {
  client.repos.getReadme({
    user: repo.owner.login,
    repo: repo.name,
    headers: {
      'accept': 'application/vnd.github.v3.html'
    }
  }, callback)
}

module.exports = readme
