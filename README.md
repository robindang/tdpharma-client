# Pharma Client

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

### Deploying the application to heroku

```sh
$ grunt build
$ grunt buildcontrol:heroku
```

You may need to set up the heroku target for git in dist. The build builds in the dist folder in the project directory.

The build builds the client into four files, an app and vendor file for the css and js. The jade templates are built into the app js file. Vendor files with external dependencies (fonts, svgs) should be built as part of client/app/app.less.

### Test
```sh
$ grunt test
```

### Server side configuration is in Gruntfile.js

Lookup ngconstant. To be moved to a separate file. Server configuration are built to client/app/config.js. To be determined if can be easily built to existing app.js file.

### Known errors

The client still tries to access Thing api. It has been removed from the server. Test are broken at the moment. To be fixed. 