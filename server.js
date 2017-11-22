const express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
const path= require('path');
const app = express();

const forceSSL = function() {
    return function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(
                [ 'https://', req.get('Host'), req.url ].join('')
            );
        }
        next();
    }
}

// Serve parse server

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var allowInsecureHTTP = true

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/parseServer/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});

// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var dashboard = new ParseDashboard({
    "apps": [
      {
        "serverURL": process.env.SERVER_URL || 'http://localhost:1337/parse',
        "appId": process.env.APP_ID || 'myAppId',
        "masterKey": process.env.MASTER_KEY || '',
        "appName": process.env.APP_NAME
      }
    ], 
    "users": [
        {
          "user": "admin",
          "pass": process.env.PASSWORD || 'NewsroomDashboard'
        }
    ]
  }, allowInsecureHTTP);
  
// Serve static assets from the /public folder
app.use('/parseServer/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
    res.sendFile(path.join(__dirname, '/parseServer/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);

// Serve the Newsroom dashboard
// app.use(forceSSL());
app.use(express.static(__dirname + '/dashboard/dist'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dashboard/dist/index.html'));
});
