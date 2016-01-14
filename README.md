# Pharmaplus app

See [here](http://ontario.herokuapp.com/) for an example.

### Installation

First install node.js [here](http://nodejs.org/). Then:

```sh
$ npm install -g grunt-cli
$ npm install -g node-inspector
```
You only need to do this once. This will install the Grunt task runner and node-inspector for server side debugging. The node-inspector is optional and only needed to run `grunt serve:debug`.

And then run the below to update the project dependencies.
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

### Server and Client Configurations

Server configurations can be found in server/config/environment/. Configurations may be overrided by adding local.env.js in server/config/environment/. Please see local.env.sample.js for an example.

Client configurations are available in client/config/environment/. Configurations are accessible in angular by injecting APP_CONFIGURATION. These configurations are generated in app/config.js as part of the target build. They may be overrided for all targets by adding local.env.json file to the client/config/ folder.

### Known Issues

The client still tries to access Thing api. It has been removed from the server. Test are broken at the moment. To be fixed. 

