![Particular.Cloud](https://s3-us-west-1.amazonaws.com/particular.cloud/logo.png)

# Simple Express Integration

Integrate [Particular.Cloud](https://particular.cloud/) into your Node.js Express server.

## Create a project

Create a project on [Particular.Cloud](https://particular.cloud/) and add your first language to it!

Make sure to create one or two tests key value pairs to test your app.

## Application Token

Generate an app (read-only) token on [Particular.Cloud](https://particular.cloud/). 

The app token is used by our cli npm package to automate your development workflow.

Find more information about how to generate a token at the [developer documentation](https://particular.cloud/documentation/developers).

*Note:* Make sure to use a read-only token if you want to commit it publicly to your source control. Write-access tokens should be treated as secrets!

## Development configuration

Copy the app token to your clipboard and add the following to your package.json:

```json
  "particular": {
    "devToken": "<app_token>",
    "defaultLanguage": "en-US"
  }
```

## VS Code extension

Get the [VS Code extension](https://marketplace.visualstudio.com/items?itemName=particular-cloud.particular-cloud) to add some magic to your development workflow!

### Optional

If you want to create new texts right from your VS Code editor, create a dev (write-access) token. 

Hide your secret write-access token by adding the following to your `.gitignore` file:

```bash
# hide write-access token
.particularrc.json
```

Add a `.particularrc.json` file to your project root and add the following to your `.particularrc.json` file:

```json
  "particular": {
    "devToken": "<dev_token>",
    "defaultLanguage": "en-US"
  }
```

## Install dependencies

### npm

```bash
# install the JavaScript i18n sdk
npm i @particular.cloud/i18n-js
# install the command-line interface (cli)
npm i -D particular.cloud
```

### yarn

```bash
# install the JavaScript i18n sdk
yarn add @particular.cloud/i18n-js
# install the command-line interface (cli)
yarn add -D particular.cloud
```

## Load your texts during build time

Add the following to your package.json scripts:

```json
  "scripts": {
    "texts": "particular.cloud texts"
  }
```

Run it! 🚀

```bash
npm run texts
```

This will load your texts from Particular.Cloud into your node_modules folder.

*Note:* The cli runs as a postinstall script. If you deploy your code, the cli should be executed automatically on `npm i`.

## Use the t function call

Use the t function call to access your localized texts.

```js
const { i18n } = require('@particular/i18n-js');

const reply = i18n.t({ key: 'helloReply', language: 'en-US' });
```

Awesome! You integrated Particular.Cloud into your create-react-app project! 🎉

## Configure i18n-js

Use the init function call to configure your Particular.Cloud integration.

*Note:* Make sure to run init only once during start up.

```js
const { i18n } = require('@particular/i18n-js');

i18n.init({ defaultLanguage: 'en-US' });
```

*Note:* Since we specified a default language in the configuration, we don't need to specify it in the t function call any longer.

```js
const { i18n } = require('@particular/i18n-js');

const reply = i18n.t({ key: 'helloReply' });
```

Learn about the extensive configuration options on the Particular.Cloud [i18n-js developer documentation](https://particular.cloud/documentation/developers/js/init).

## Accept-Language header

Take advantage of the Accept-Language header to get the best localized texts.

```js
const { i18n } = require('@particular/i18n-js');

const acceptLanguage = req.headers['accept-language'];
i18n.setAcceptLanguage(acceptLanguage);

// based on defaultLanguage and acceptLanguage header, query best fitting localized text
const text = i18n.t({ key: 'helloReply' });
```