![Particular.Cloud](https://s3-us-west-1.amazonaws.com/particular.cloud/logo.png)

# Create-React-App Integration

Integrate [Particular.Cloud](https://particular.cloud/) into your create-react-app project.

## Create a project

Create a project on [Particular.Cloud](https://particular.cloud/) and add your first language to it!

Make sure to create one or two tests key value pairs to test your app.

## Application Token

Generate an app token on [Particular.Cloud](https://particular.cloud/). 

Our React SDKs uses the application token to query texts from Particular.Cloud.
The app token is used by our VS Code extension and our cli npm package to automate your development workflow.

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