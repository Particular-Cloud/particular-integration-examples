![Particular.Cloud](https://s3-us-west-1.amazonaws.com/particular.cloud/logo.png)

# Create-React-App Integration

Integrate [Particular.Cloud](https://particular.cloud/) into your create-react-app project.

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
# install the react i18n sdk
npm i @particular.cloud/i18n-react
# install the command-line interface (cli)
npm i -D particular.cloud
```

### yarn

```bash
# install the react i18n sdk
yarn add @particular.cloud/i18n-react
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

## Configure i18n-react

Use the I18nProvider context provider to configure your Particular.Cloud integration.

```js
import { I18nProvider } from '@particular/i18n-react';
```

Make sure to use the I18nProvider at the root of your project.

```jsx
    <React.StrictMode>
        <I18nProvider config={{ defaultLanguage: 'en-US' }}>
            <App />
        </I18nProvider>
    </React.StrictMode>,
```

Learn about the extensive configuration options on the Particular.Cloud [i18n-js developer documentation](https://particular.cloud/documentation/developers/js/init).

## Use the useText hook

Use the useText hook to access your localized texts.

```js
import { useText } from '@particular/i18n-react';
```

```jsx
 <h1 className="App-content">{useText({ key: 'lpTitle' })}</h1>
```

*Note:* Since we specified a default language in the configuration, the useText hook will return the text in the default language.

Awesome! You integrated Particular.Cloud into your create-react-app project! 🎉