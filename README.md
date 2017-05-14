# stars-tumblr

[![Greenkeeper badge](https://badges.greenkeeper.io/Gerhut/stars-tumblr.svg)](https://greenkeeper.io/)
Put GitHub repositories I starred into Tumblr.

## Usage

1. [Generate personal access token][github token] of GitHub.
  Generate new access token with *no scopes*.
  Write down generated token and label it *GITHUB_TOKEN*.
2. [Register application][tumblr register] of Tumblr.
  Free to fill in the form.
  Fill *Default callback URL* a temporary value.
  Write down consumer key and label it *TUMBLR_CONSUMER_KEY*.
  Write down consemer secret and label it *TUMBLR_CONSUMER_SECRET*.
3. [![Deploy to Heroku][deploy image]][deploy link].
  Fill in the *Config Variables* with your wrote down with label.
  Press *Deploy for Free*.
  Write down *App Name* no matter how it is generated.
4. Go to [Apps][tumblr apps] of Tumblr.
  Edit the app you just registered.
  Set *Default callback URL* to `http://{Your app name}.herokuapp.com/`
5. Visit your Heroku URL `http://{Your app name}.herokuapp.com/`, authorize Tumblr.
6. Have a cup of coffee and wait for it putting all repositories you starred into your blog.

## License

GPL-3.0

[github token]: https://github.com/settings/tokens/new
[tumblr register]: https://www.tumblr.com/oauth/register
[tumblr apps]: https://www.tumblr.com/settings/apps
[deploy image]: https://www.herokucdn.com/deploy/button.png "Deploy to Heroku"
[deploy link]: https://heroku.com/deploy?template=https://github.com/gerhut/stars-tumblr/tree/master
