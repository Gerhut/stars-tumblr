require('./config')

var recent = require('./libs/tumblr/recent')
var Starred = require('./libs/github/starred')
var readme = require('./libs/github/readme')
var post = require('./libs/tumblr/post')

recent(function (err, repo_id) {
  if (err) return console.error(err)
  var starred = new Starred(repo_id)
  starred.on('error', function (err) {
    console.error(err)
  }).on('repo', function (repo) {
    readme(repo, function (err, repo) {
      if (err) return console.error(err)
      post(repo, function (err) {
        if (err) return console.error(err)
      })
    })
  }).run()
})
