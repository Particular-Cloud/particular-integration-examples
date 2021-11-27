![Particular.Cloud](https://s3-us-west-1.amazonaws.com/particular.cloud/logo.png)

# Amazon Alexa Integration

Integrating [Particular.Cloud](https://particular.cloud/) into your Amazon Alexa project is super easy. 

## Amazon Alexa Skill

If you don't have an Amazon Alexa Skill created yet, create a new Skill either through the [Amazon Alexa Console](https://developer.amazon.com/en-US/alexa) or [Alexa Skills Toolkit VS Code extension](https://marketplace.visualstudio.com/items?itemName=ask-toolkit.alexa-skills-kit-toolkit).

Download your new skill project to your local machine.

## Create a project

Create a project on [Particular.Cloud](https://particular.cloud/) and add your first language to it!

Make sure to create a few texts to test your project so you can test your application.

## Application token

Navigate to the settings page of your project and generate a read-only token for your project. Find more information about how to generate a token in the [developer documentation](https://particular.cloud/documentation/developers).

*Note:* Make sure you are creating a *read-only* token and not a *write-access* token! You can commit your read-only tokens to public repositories and to your client-side applications without fear.

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

Run `npx particular.cloud texts` to load your texts from Particular.Cloud into your node_modules folder.

Navigate to `node_modules/@particular.cloud/texts/dist/index.js` to enjoy a sneak peak of the loaded texts.

Let's automate this process by adding the following to your `package.json` file:

```json
  "scripts": {
    "postinstall": "particular.cloud texts"
  }
```

*Note:* The cli now runs as a postinstall script. If you deploy your code, the cli should be executed automatically on `npm i`. In case your deployment process does not install devDependencies, make sure to install `particular.cloud` as a dependency instead. You can also use npx instead during your build process.

```json
  "scripts": {
    "postinstall": "npx particular.cloud texts"
  }
```

## Use the t function call

Use the t function call to access your localized texts.

```js
const { i18n } = require('@particular/i18n-js');

// Note: we will optimize this code later to get rid of the language property
const reply = i18n.t( { key: 'helloWorldReply', language: handlerInput.requestEnvelope.request.locale } );
```

Awesome! You integrated Particular.Cloud into your create-react-app project! 🎉

## Create a middleware to set the request language

Parse the locale from the user request and pass it on to i18n-js.

```js
const { i18n } = require('@particular/i18n-js');

// a middleware function that will be called for every request
const I18nMiddleware = {
    process(handlerInput) {
        const { locale } = handlerInput.requestEnvelope.request;
        console.log(`user request with locale ${locale}`);

        // specify the user's locale globally for all request handlers
        i18n.setDefaultLanguage(locale);
    },
};
```

Then make sure the middleware is executed before the requests.

```js
exports.handler = Alexa.SkillBuilders.custom()
    // add the i18n middleware as a request interceptor
    .addRequestInterceptors(I18nMiddleware)
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    )
    .addErrorHandlers(ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
```

Now you can omit the language property from your t function calls! 😎

```js
const { i18n } = require('@particular/i18n-js');

// language already set in the middleware
const reply = i18n.t( { key: 'helloWorldReply' } );
```

## Configure i18n-js

Use the init function call to configure your Particular.Cloud integration.

```js
const { i18n } = require('@particular/i18n-js');

i18n.init({ ... });
```

Learn about the extensive configuration options on the Particular.Cloud [i18n-js developer documentation](https://particular.cloud/documentation/developers/js/init).