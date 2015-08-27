# stars-tumblr
Put GitHub repositories I starred into Tumblr.

## Usage

    $ vim config.js

    require('./libs/github').token = ''
    require('./libs/tumblr').credentials = {
      consumer_key: '',
      consumer_secret: '',
      token: '',
      token_secret: ''
    }
    require('./libs/tumblr').blog = ''

    $ node index.js

## License

GPL-3.0
