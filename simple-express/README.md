![Particular.Cloud](https://s3-us-west-1.amazonaws.com/particular.cloud/logo.png)

# Simple Express Integration

Localize your Node.js Express server application with [Particular.Cloud](https://particular.cloud/).

## Create a simple Express server

Let's create a simple express application. Follow the hello-world example in the [Express documentation](https://expressjs.com/en/starter/hello-world.html) to get up in running in a second!

## Optional: VS Code extension

If you are using VS Code, get yourself the Particular.Cloud [VS Code extension](https://marketplace.visualstudio.com/items?itemName=particular-cloud.particular-cloud) to add some magic to your development workflow!

We will set it up in a moment!

## Create a project

But first, let's head over to [Particular.Cloud](https://particular.cloud/) to create our first project! [Create an account](https://particular.cloud/auth/signup) or [login into your excisting account](https://particular.cloud/auth/login). 

<img src="https://s3.us-west-1.amazonaws.com/particular.cloud/particular-integration-examples/create-project.png" alt="Create project on Particular.Cloud" width="400" style="border-radius: 0.375rem;">

Navigate to the dashboard and create a new project. 😎

<img src="https://s3.us-west-1.amazonaws.com/particular.cloud/particular-integration-examples/simple-express/add-languages.png" alt="Add languages on Particular.Cloud" width="400" style="border-radius: 0.375rem;">

Next, let's add some languages to our newly-created project!

<img src="https://s3.us-west-1.amazonaws.com/particular.cloud/particular-integration-examples/simple-express/create-text.png" alt="Create text on Particular.Cloud" width="400" style="border-radius: 0.375rem;">

Make sure to also create a few texts. Click on the `View Texts` button for one of your languages. You can also start translating the texts to other languages already.

<img src="https://s3.us-west-1.amazonaws.com/particular.cloud/particular-integration-examples/simple-express/texts.png" alt="Texts list on Particular.Cloud" width="800" style="border-radius: 0.375rem;">

Awesome! 🥳 We are all set!

## Development configuration

Now let's create some tokens on Particular.Cloud. Tokens connect your applications to Particular.Cloud. 

Particular.Cloud differentiates between read-only and write-access tokens:

- Read-only tokens can be added to the `package.json` file and are used by our CLI tool to authenticate with Particular.Cloud. Additionally, your Express application uses a read-only token to connect to Particular.Cloud.
- Write-access tokens should be treated as secrets and added to a hidden `.particularrc.json` file. Our VS Code extension uses this token to authenticate with Particular.Cloud. Write-access token enable text creation right from VS Code! How neat!

### Optional: Write-access token

Write-access token enable the creation of new texts right from your VS Code editor (using the Particular.Cloud extension). They are a great way to speed up your localization process. Refactoring applications to integrate i18n was never easier!

> Write-access token have write-access to your Particular.Cloud project. You shoulder **never** commit your write-access token to a public repository or share it with anyone.

**Agreed?** Great!

Let's add a `.particularrc.json` file to our project root folder:

```json
  {
    "token": "<write-access-token>",
    "defaultLanguage": "en-US"
  }
```

**IMPORTANT ❗:** Hide your secret write-access token by adding the following to your `.gitignore` file:

```bash
# hide write-access token
.particularrc.json
```

Next, go back to your browser window and navigate to the settings page of your [Partiuclar.Cloud](https://particular.cloud) project and create a write-access token.

[![Create write-access token on Particular.Cloud](https://s3.us-west-1.amazonaws.com/particular.cloud/thumbnail-create-write-acces-token.png)](https://vimeo.com/663837554
 "Create write-access token on Particular.Cloud - Click to Watch!")

Find more information about how to create tokens in the [developer documentation](https://particular.cloud/documentation/developers/v1#development-configuration).

Copied the token to your clipboard? Awesome! Let's replace `<write-access-token>` in the `.particularrc.json` file with your write-access token.

And your VS Code extension is ready to go! 🚀


### Read-only token

Read-only token are used by our application to authenticate with Particular.Cloud. Additionally, our CLI tool uses this token to fetch texts from Particular.Cloud.

Navigate to the settings page of your project and create a read-only token. Find more information about how to create a token in the [developer documentation](https://particular.cloud/documentation/developers/v1#development-configuration).

*Note:* You can commit your **read-only** tokens to public repositories and to your client-side applications without fear.

Add the following to your package.json in your project root folder:

```json
  "particular": {
    "token": "<read-only-token>",
    "defaultLanguage": "en-US"
  }
```

Navigate back to your browser window and copy the read-only token to your clipboard.

Awesome! Let's replace `<read-only-token>` with the token from our clipboard. And our CLI tool is ready to go! 🚀

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

Run `npx particular.cloud texts` to load your texts from Particular.Cloud into your `node_modules` folder.

Navigate to `node_modules/@particular.cloud/texts/dist/index.js` to enjoy a sneak peak of the loaded texts.

Let's automate this process by adding a postinstall command to the `package.json` file:

```json
  "scripts": {
    "postinstall": "particular.cloud texts"
  }
```

*Note:* The cli now runs as a postinstall script. If you deploy your code, the cli should be executed automatically on `npm i`. In case your deployment process does not install devDependencies, make sure to install `particular.cloud` as a dependency. You can also use npx instead during your build process.

```json
  "scripts": {
    "postinstall": "npx particular.cloud texts"
  }
```

## Integrate i18n-js into Express

### Configure i18n-js

Let's import the `i18n` object from `@particular.cloud/i18n-js` into our Express application. Open your `index.js` file and add the following line:

```js
const { i18n } = require('@particular.cloud/i18n-js');
```

Next we use the init function call to configure i18n-js:


```js
const { i18n } = require('@particular/i18n-js');

i18n.init({ defaultLanguage: 'en-US' });
```

*Note:* Make sure to run init only once during start up.

We pass a defaultLanguage to i18n as a fallback and we are good to go! Learn about the extensive configuration options on the Particular.Cloud [i18n-js developer documentation](https://particular.cloud/documentation/developers/v1/javascript-api#init).

Now, let's localize some server responses!

### Use the t function call

Remember that we fetched our localized strings from Particular.Cloud into our `node_modules` folder by running `npx particular.cloud texts`? Now, we use the t - t for translate - function call to query for that localized texts:

```js
const { i18n } = require('@particular/i18n-js');

app.get('/', (req, res) => {
    // query for localized texts locally from the `node_modules` folder
    const text = i18n.t({ key: 'helloReply' });
    // return the localized text
    res.send(text);
});
```

This will return `Hello World!` in US English as we specified `en-US` as our default language.

Awesome! You integrated Particular.Cloud into your express project! 🎉

### Accept-Language header

One common approach to figure out the language of the user is to use the `Accept-Language` header.

So let's add the following code to our request handler to get the `Accept-Language` header:

```js
const { i18n } = require('@particular/i18n-js');

app.get('/', (req, res) => {
    // get the accept-language header, e.g. "en-US,en;q=0.8,de;q=0.6"
    const acceptLanguage = req.headers['accept-language'];
    console.log(`user request with accept-language: ${acceptLanguage}`);

    // let i18n know about the accept-language header
    i18n.setAcceptLanguage(acceptLanguage);

    // query for localized texts from Particular.Cloud
    const text = i18n.t({ key: 'helloReply' });
    res.send(text);
});
```

*Note:* i18n-js will use the accept-language header to determine the language of the user based on your supported languages.

> The defaultLanguage will be used as a fallback in case the user requests languages that are not supported.

And we are all set! 🎉

## Next steps

### Refactor strings to t function calls

Use the VS Code extension to refactor strings to t function calls without leaving the editor. The strings are automatically saved to your Particular.Cloud project!

You can find a short video detailing the keyboard shortcuts in the [VS Code documentation](https://particular.cloud/documentation/developers/v1/vscode#string-refactoring).