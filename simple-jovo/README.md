![Particular.Cloud](https://s3-us-west-1.amazonaws.com/particular.cloud/logo.png)

# Jovo Integration

Localize your voice applications with [Particular.Cloud](https://particular.cloud/).

## Jovo v4

This demo application uses Jovo v4. You can follow the [getting started guide](https://www.jovo.tech/docs/getting-started) on the Jovo website to setup your hello-world application.

Jovo comes with i18next built into the framework. In most cases, you want to use i18next together with Jovo. Follow the [jovo-i18next integration example](/jovo-i18next) to learn how to connect Particular.Cloud to i18next!

In this integration example, we will be using `@particular.cloud/i18n-js` instead of i18next. This is especially useful if you want to enable advanced use cases of Particular.Cloud such as websocket connections, run-time fetching, etc. It also takes full advantage of our VS Code exention!

## Optional: VS Code extension

If you are using VS Code, get yourself the Particular.Cloud [VS Code extension](https://marketplace.visualstudio.com/items?itemName=particular-cloud.particular-cloud) to add some magic to your development workflow!

We will set it up in a moment!

## Create a project

But first, let's head over to [Particular.Cloud](https://particular.cloud/) to create our first project! [Create an account](https://particular.cloud/auth/signup) or [login into your excisting account](https://particular.cloud/auth/login). 

<img src="https://s3.us-west-1.amazonaws.com/particular.cloud/particular-integration-examples/create-project.png" alt="Create project on Particular.Cloud" width="400" style="border-radius: 0.375rem;">

Navigate to the dashboard and create a new project. 😎

<img src="https://s3.us-west-1.amazonaws.com/particular.cloud/particular-integration-examples/simple-jovo/add-languages.png" alt="Add languages on Particular.Cloud" width="400" style="border-radius: 0.375rem;">

Next, let's add some languages to our newly-created project!

<img src="https://s3.us-west-1.amazonaws.com/particular.cloud/particular-integration-examples/simple-jovo/create-text.png" alt="Create text on Particular.Cloud" width="400" style="border-radius: 0.375rem;">

Make sure to also create a few texts. Click on the `View Texts` button for one of your languages. You can also start translating the texts to other languages already.

<img src="https://s3.us-west-1.amazonaws.com/particular.cloud/particular-integration-examples/simple-jovo/texts.png" alt="Texts list on Particular.Cloud" width="800" style="border-radius: 0.375rem;">

Awesome! 🥳 We are all set!

## Development configuration

Now let's create some tokens on Particular.Cloud. Tokens connect your applications to Particular.Cloud. 

Particular.Cloud differentiates between read-only and write-access tokens:

- Read-only tokens can be added to the `package.json` file and are used by our CLI tool to authenticate with Particular.Cloud. Additionally, your Jovo application can use the read-only token to connect to Particular.Cloud (optional).
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

Add the following to your package.json:

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

## Integrate i18n-js into your Jovo application

### Custom plugin and request middleware

First, let's create a small custom plugin for our Particular.Cloud integration.

Create a `src/plugins/` folder in your hello-world Jovo project folder. In the `src/plugins/` folder, create a `ParticularlyI18n.ts` file and copy the code from [here](/src/plugins/ParticularlyI18n.ts) into the file.

Great! Now we have created a plugin that integrates `i18n-js` into our Jovo application. Checkout the `mount` function in particular. The `mount` function creates a small request middleware that sets the default language of `i18n-js` to the language of the request.

### Use the custom plugin

In your `src/app.ts` file, import our custom plugin `ParticularlyI18n` 
and add it to the `plugins` array:

```ts
import { ParticularlyI18n } from './plugins/ParticularlyI18n';

const app = new App({
  // ...
  plugins: [
    new ParticularlyI18n({
      config: {
        // put your ParticularConfig here
      },
    }),
  ],
  // ...
});
```

### Use the t function in your components

Remember that we loaded the texts from Particular.Cloud into our `node_modules` folder? Now we use the `t` function call to query for the localized texts:

```js
import { Component, BaseComponent, Intents } from '@jovotech/framework';
import i18n from '@particular.cloud/i18n-js';

import { YesNoOutput } from '../output/YesNoOutput';

@Component()
export class LoveHatePizzaComponent extends BaseComponent {
  START() {
    const message = i18n.t({ key: 'do-you-like-pizza-prompt' });
    return this.$send(YesNoOutput, { message });
  }

  @Intents(['YesIntent'])
  lovesPizza() {
    const message = i18n.t({ key: 'loves-pizza-reply' });
    return this.$send({ message: message, listen: false });
  }

  @Intents(['NoIntent'])
  hatesPizza() {
    const message = i18n.t({ key: 'hates-pizza-reply' });
    return this.$send({ message: message, listen: false });
  }

  UNHANDLED() {
    return this.START();
  }
}
```

Awesome! You integrated Particular.Cloud into your Jovo project! 🎉

## Use the t function in your output

Similar to the `t` function call in your components, we can use the `t` function call in our output:

```ts
import { Jovo, BaseOutput, Output, OutputTemplate } from '@jovotech/framework';
import i18n from '@particular.cloud/i18n-js';

@Output()
export class YesNoOutput extends BaseOutput {
  build(): OutputTemplate | OutputTemplate[] {
    const yes = i18n.t({ key: 'yes' });
    const no = i18n.t({ key: 'no' });
    return {
      quickReplies: [yes, no],
      listen: true,
    };
  }
}
```

## Next steps

### Refactor strings to t function calls

Use the VS Code extension to refactor strings to t function calls without leaving the editor. The strings are automatically saved to your Particular.Cloud project!

You can find a short video detailing the keyboard shortcuts in the [VS Code documentation](https://particular.cloud/documentation/developers/v1/vscode#string-refactoring).
