var starred = require('../libs/starred')

describe('github', function () {
  describe('starred', function () {
    it('should work', function (done) {
      var count = 0

      starred(function (err, repo, starred_at, next) {
        if (err) return done(err)

        repo.should.have.properties([
          'id', 'name', 'full_name', 'html_url'
        ])
        starred_at.should.be.a.String()
        starred_at.length.should.be.above(0)
        if (++count > 20) {
          done()
        } else {
          next()
        }
      })
    })
  })
})
