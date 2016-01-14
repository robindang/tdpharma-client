x# Pharma Client

See [example](http://ontario.herokuapp.com/).

### Installation

First install [node.js](http://nodejs.org/). Then:

```sh
$ npm install
$ bower install
```

### Running the application

Production
```sh
$ grunt serve:dist
```
Development
```sh
$ grunt serve
```
Debugging server with node-inspector
```sh
$ grunt serve:debug
```

### Deploying the application to heroku

```sh
$ grunt build
```
Commit and push the resulting build, located in your dist folder.
```sh
$ grunt buildcontrol:heroku
```

You may need to set up the heroku target for git in dist. The build builds in the dist folder in the project directory.

The build builds the client into four files, an app and vendor file for the css and js. The jade templates are built into the app js file. Vendor files with external dependencies (fonts, svgs) should be built as part of client/app/app.less.

### Test
```sh
$ grunt test
```

### Server side configuration is in Gruntfile.js

Server configurations can be found in server/config/environment/. Configurations may be overrided by adding local.env.js in server/config/environment/. Please see local.env.sample.js for an example.

Client configurations are available in client/config/environment/. Configurations are accessible in angular by injecting APP_CONFIGURATION. They are incorporated into the build and is built to app/config.js. Client configurations may be overrided for all targets by adding local.env.json file to the client/config/ folder.

### Known errors

The client still tries to access Thing api. It has been removed from the server. Test are broken at the moment. To be fixed. 

