var readme = require('../libs/readme')

describe('github', function () {
  describe('readme', function () {
    it('should work', function (done) {
      readme('gerhut/stars-tumblr', function (err, content) {
        if (err) return done(err)

        content.should.be.a.String()
        done()
      })
    })
    it('should work with no content', function (done) {
      readme('Dafrok/react-digiclock', function (err, content) {
        if (err) return done(err)

        content.should.be.a.String().and.have.length(0)
        done()
      })
    })
  })
})
