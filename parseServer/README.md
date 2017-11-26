

## Deploying CitizenReporter Parse Server and Dashboard in a Dokku

### Local Development

```shell
> npm install -g parse-server mongodb-runner parse-dashboard
> mongodb-runner start
> parse-server --appId APPLICATION_ID --masterKey MASTER_KEY --databaseURI mongodb://localhost/test
> parse-dashboard --appId yourAppId --masterKey yourMasterKey --serverURL "https://example.com/parse" --appName   
  optionalName
```

Install ngrok to test with devices.

### Production SetUp on Dokku

You first need to install the dock MongoDB plugin by running:

```shell
> dokku plugin:install https://github.com/dokku/dokku-mongo.git mongo
```

Once installed, you can create your app and database and link them:

```shell
> dokku mongo:create parsedb
> dokku apps:create <app_name>
> dokku mongo:link parsedb <app_name>
```

You will now have a `MONGO_URL` environment variable. Set up other environment variables too:

```shell
> dokku config:set <app_name> DATABASE_URI=<MONGO_URL>
> dokku config:set <app_name> APP_ID=<APP_ID>
> dokku config:set <app_name> APP_SECRET=<APP_SECRET>
> dokku config:set <app_name> MASTER_KEY=<MASTER_KEY>
> dokku config:set <app_name> PASSWORD=<PASSWORD>
> dokku config:set <app_name> APP_NAME=<APP_NAME>
```

Clone `https://github.com/phillipahereza/CitizenReporter-Parse-Server` and then add the dokku remote

```shell
> git remote add dokku dokku@my.dokku.me:parse
> git push dokku master
```

The dashboard will be available at `<url>/dashboard`


### Bonus: Let's Encrypt

To add SSL to your Parse server, just install the [Dokku LetsEncrypt plugin](https://github.com/dokku/dokku-letsencrypt) 

```shell
> dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
> dokku config:set --no-restart myapp DOKKU_LETSENCRYPT_EMAIL=<EMAIL>
> dokku letsencrypt myapp
```

### Parse Server on other Hosting services

A detailed tutorial is available here: [Running Parse server on other hosting services](https://github.com/parse-community/parse-server-example)



