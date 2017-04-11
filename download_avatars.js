var request = require('request');
var fs = require('fs')

var GITHUB_USER = "tranht86";
var GITHUB_TOKEN = "fd490d6b342629d5cd978ab670e224c3e64a6522";



console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  var requestURL = {
    url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'GIF Avatar'
    }
  };

  request(requestURL, function(error, response, body) {
    if (error) {
      console.log("Got error: ", error)
      return
    }

    var json = JSON.parse(body)
    cb(json)

    for(i of json) {
    var avatar = i.avatar_url
    console.log("Avatar URL: ", avatar);
    downloadImageByURL(avatar, i.login)

    }
    })
  };

function downloadImageByURL(url, filePath) {

  request(url).pipe(fs.createWriteStream('./avatars/' + filePath +'.jpg'))
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
