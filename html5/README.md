# RadJav HTML5
The HTML5 version of RadJav. This is written in TypeScript and transpiles to JavaScript, which is then embedded into libRadJav. At the same time it also will build the HTML5 version of RadJav which can be embedded into nearly any web app. Once embedded, the developer must call the RadJav app to execute.

## How to build
NodeJS is required to build. From a terminal type: 

	npm install

Once everything is installed, you can now build. To build type:

	npm run build

To test the HTML5 version run: 

	npm run http

This will start a web server on the local machine you can connect to. Every time you make changes to a file, the page will refresh to reflect the latest changes.