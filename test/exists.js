var exists = require('../libs/exists')

describe('tumblr', function () {
  describe('exists', function () {
    it('should works', function (done) {
      exists(0, function (err, exists) {
        if (err) return done(err)

        exists.should.be.false()
        done()
      })
    })
  })
})
