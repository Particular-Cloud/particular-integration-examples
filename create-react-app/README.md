![Particular.Cloud](https://s3-us-west-1.amazonaws.com/particular.cloud/logo.png)

# create-react-app Integration

Localize your create-react-app application with [Particular.Cloud](https://particular.cloud/).

## Run create-react-app

Let's start off by creating a new React application. Open up a terminal and run the following command:

```sh
npx create-react-app my-app
cd my-app
npm start
```

Awesome! Our application is now running on [http://localhost:3000](http://localhost:3000)! 🚀

## Optional: VS Code extension

If you are using VS Code, get yourself the Particular.Cloud [VS Code extension](https://marketplace.visualstudio.com/items?itemName=particular-cloud.particular-cloud) to add some magic to your development workflow!

We will set it up in a moment!

## Create a project

But first, let's head over to [Particular.Cloud](https://particular.cloud/) to create our first project! [Create an account](https://particular.cloud/auth/signup) or [login into your excisting account](https://particular.cloud/auth/login). 

<img src="https://s3.us-west-1.amazonaws.com/particular.cloud/particular-integration-examples/create-project.png" alt="Create project on Particular.Cloud" width="400" style="border-radius: 0.375rem;">

Navigate to the dashboard and create a new project. 😎

<img src="https://s3.us-west-1.amazonaws.com/particular.cloud/particular-integration-examples/create-react-app/add-languages.png" alt="Add languages on Particular.Cloud" width="400" style="border-radius: 0.375rem;">

Next, let's add some languages to our newly-created project!

<img src="https://s3.us-west-1.amazonaws.com/particular.cloud/particular-integration-examples/create-react-app/create-text.png" alt="Create text on Particular.Cloud" width="400" style="border-radius: 0.375rem;">

Make sure to also create a few texts. Click on the `View Texts` button for one of your languages. You can also start translating the texts to other languages already.

<img src="https://s3.us-west-1.amazonaws.com/particular.cloud/particular-integration-examples/create-react-app/texts.png" alt="Texts list on Particular.Cloud" width="800" style="border-radius: 0.375rem;">

Awesome! 🥳 We are all set!

## Development configuration

Now let's create some tokens on Particular.Cloud. Tokens connect your applications to Particular.Cloud. 

Particular.Cloud differentiates between read-only and write-access tokens:

- Read-only tokens can be added to the `package.json` file and are used by our CLI tool to authenticate with Particular.Cloud. Additionally, your create-react-app project can use a read-only token to connect to Particular.Cloud (optional).
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

[![Create write-access token on Particular.Cloud](https://s3.us-west-1.amazonaws.com/particular.cloud/thumbnail-create-write-acces-token.png)](https://vimeo.com/650518749 "Create write-access token on Particular.Cloud - Click to Watch!")

Find more information about how to create tokens in the [developer documentation](https://particular.cloud/documentation/developers/v1).

Copied the token to your clipboard? Awesome! Let's replace `<write-access-token>` in the `.particularrc.json` file with your write-access token.

And your VS Code extension is ready to go! 🚀


### Read-only token

Read-only token are used by our application to authenticate with Particular.Cloud. Additionally, our CLI tool uses this token to fetch texts from Particular.Cloud.

Navigate to the settings page of your project and create a read-only token. Find more information about how to create a token in the [developer documentation](https://particular.cloud/documentation/developers/v1).

*Note:* You can commit your **read-only** tokens to public repositories and to your client-side applications without fear.

Add the following to your package.json in `my-app/`:

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
# install the React i18n sdk
npm i @particular.cloud/i18n-react
# install the command-line interface (cli)
npm i -D particular.cloud
```

### yarn

```bash
# install the React i18n sdk
yarn add @particular.cloud/i18n-react
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

## Integrate i18n-react into create-react-app

Open `src/index.jsx` in your code editor and import `I18nProvider` from `@particular.cloud/i18n-react`:

```jsx
import { I18nProvider } from '@particular/i18n-react';
```

The `I18nProvider` context provider is used to configure the i18n-react library. For that, let's wrap our App component with the I18nProvider:

```jsx
    <React.StrictMode>
        <I18nProvider config={{ defaultLanguage: 'en-US' }}>
            <App />
        </I18nProvider>
    </React.StrictMode>
```

You can pass I18nProvider an object with configuration options. Learn about the extensive configuration options on the Particular.Cloud [i18n-js developer documentation](https://particular.cloud/documentation/developers/v1/javascript-api#init).

For now, we just specify the default language for our users.

## Use the useText hook

Use the useText hook to access your localized texts. Open `src/App.jsx` in your code editor and import the `useText` hook from `@particular.cloud/i18n-react`:

```js
import { useText } from '@particular/i18n-react';
```

```jsx
 <h1 className="App-content">{useText({ key: 'lpTitle' })}</h1>
```

Awesome! You integrated Particular.Cloud into your create-react-app project! 🎉

## Change language

You can change the language by altering the `defaultLanguage` passed down to the `I18nProvider` in `src/index.jsx`.

Alternatively, you can also change the default language through the `i18n` object. Let's do that!

Open `src/App.jsx` again and alter the import:

```jsx
import { useText, useLanguage, i18n } from '@particular/i18n-react';
```

Now let's access the current language by using the `useLanguage` hook:

```jsx
const { langCodeOrLocale } = useLanguage();
```

We use the `langCodeOrLocale` variable implement a simple toggle button:

```jsx
<button
    className="App-button"
    type="button"
    onClick={() =>
        langCodeOrLocale === 'en-US'
            ? i18n.setDefaultLanguage('de-DE')
            : i18n.setDefaultLanguage('en-US')
    }
>
    {useText({ key: 'lpChangeLanguageBtn' })}
</button>
```

And we are all set! 🚀

Run the changes locally and hit that button. 🎉  Remember that we fetched our localized strings from Particular.Cloud into our `node_modules` folder by running `npx particular.cloud texts`? See how lightning fast the languages changes as we query the strings locally from your `node_modules` folder!

## Next steps
### Refactor strings to useText hook calls

Use the VS Code extension to refactor strings to useText hook calls without leaving the editor. The strings are automatically saved to your Particular.Cloud project!

You can find a short video detailing the keyboard shortcuts in the [VS Code documentation](https://particular.cloud/documentation/developers/v1/vscode#string-refactoring).