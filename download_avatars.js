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

    if (response.statusCode === 200) {
      for(i of json) {
        var avatar = i.avatar_url
        console.log("Avatar URL: ", avatar);
        downloadImageByURL(avatar, i.login)
      }
    } else {
      console.log('not found!')
    }
  })
};

function downloadImageByURL(url, filePath) {

  request(url).pipe(fs.createWriteStream('./avatars/' + filePath +'.jpg'))
}


var owner = process.argv[2]
var repo = process.argv[3]

if (owner === undefined || repo === undefined) {
  console.log("Please enter in format node download_avatars.js <owner> <repo>")
} else {
  getRepoContributors(owner, repo, function(err, result) {
    console.log("Result:", result);
  });
}
