![Particular.Cloud](https://s3-us-west-1.amazonaws.com/particular.cloud/logo.png)

# Simple Remix Integration

Localize your Remix application with [Particular.Cloud](https://particular.cloud/).

## Run create-remix

Let's start off by creating a new Remix application. Open up a terminal and run the following command:

```sh
npx create-remix@latest simple-remix/
```

Follow the prompts of Derrick the Remix Compact Disc 💿.

For a simple setup, we select `Remix App Server` and `TypeScript` and run `npm install`!

```text
R E M I X

💿 Welcome to Remix! Let's get you set up with a new project.

? Where do you want to deploy? Choose Remix if you're unsure, it's easy to chang
e deployment targets. Remix App Server
? TypeScript or JavaScript? TypeScript
? Do you want me to run `npm install`? Yes
```

## Optional: VS Code extension

If you are using VS Code, get yourself the Particular.Cloud [VS Code extension](https://marketplace.visualstudio.com/items?itemName=particular-cloud.particular-cloud) to add some magic to your development workflow!

We will set it up in a moment!

## Create a project

But first, let's head over to [Particular.Cloud](https://particular.cloud/) to create our first project! [Create an account](https://particular.cloud/auth/signup) or [login into your excisting account](https://particular.cloud/auth/login). 

<img src="https://s3.us-west-1.amazonaws.com/particular.cloud/particular-integration-examples/create-project.png" alt="Create project on Particular.Cloud" width="400" style="border-radius: 0.375rem;">

Navigate to the dashboard and create a new project. 😎

<img src="https://s3.us-west-1.amazonaws.com/particular.cloud/particular-integration-examples/simple-remix/add-languages.png" alt="Add languages on Particular.Cloud" width="400" style="border-radius: 0.375rem;">

Next, let's add some languages to our newly-created project!

<img src="https://s3.us-west-1.amazonaws.com/particular.cloud/particular-integration-examples/simple-remix/create-text.png" alt="Create text on Particular.Cloud" width="400" style="border-radius: 0.375rem;">

Make sure to also create a few texts. Click on the `View Texts` button for one of your languages. You can also start translating the texts to other languages already.

<img src="https://s3.us-west-1.amazonaws.com/particular.cloud/particular-integration-examples/simple-remix/texts.png" alt="Texts list on Particular.Cloud" width="800" style="border-radius: 0.375rem;">

Awesome! 🥳 We are all set!

## Development configuration

Now let's create some tokens on Particular.Cloud. Tokens connect your applications to Particular.Cloud. 

Particular.Cloud differentiates between read-only and write-access tokens:

- Read-only tokens can be added to the `package.json` file and are used by our CLI tool to authenticate with Particular.Cloud. Additionally, your Remix application uses a read-only token to connect to Particular.Cloud.
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

Find more information about how to create tokens in the [developer documentation](https://particular.cloud/documentation/developers).

Copied the token to your clipboard? Awesome! Let's replace `<write-access-token>` in the `.particularrc.json` file with your write-access token.

And your VS Code extension is ready to go! 🚀


### Read-only token

Read-only token are used by our application to authenticate with Particular.Cloud. Additionally, our CLI tool uses this token to fetch texts from Particular.Cloud.

Navigate to the settings page of your project and create a read-only token. Find more information about how to create a token in the [developer documentation](https://particular.cloud/documentation/developers).

*Note:* You can commit your **read-only** tokens to public repositories and to your client-side applications without fear.

Add the following to your package.json in `simple-remix/`:

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
    "postinstall": "remix setup node && particular.cloud texts"
  }
```

*Note:* The cli now runs as a postinstall script. If you deploy your code, the cli should be executed automatically on `npm i`. In case your deployment process does not install devDependencies, make sure to install `particular.cloud` as a dependency. You can also use npx instead during your build process.

```json
  "scripts": {
    "postinstall": "remix setup node &&  npx particular.cloud texts"
  }
```

## Integrate i18n-react into Remix

Let's open the `root.tsx` file of our Remix application at `/app/root.tsx`.

Let's start by importing the `I18nProvider` from `@particular.cloud/i18n-react`.

```tsx
import { I18nProvider } from '@particular.cloud/i18n-react';
```

Next, we wrap our entire Application with the `I18nProvider` component.

```tsx
export default function App() {
  return (
    <I18nProvider>
      <Document>
        <Layout>
          <Outlet />
        </Layout>
      </Document>
    </I18nProvider>
  );
}
```

Now we have access to our I18n utilities accross all components! 🚀

### Accept-Language header

The accept-language header is great way to determine the preferred language of a user. All modern browsers attach the header to any request by default based on the user settings.

We add a loader function to root.tsx to pass the `Accept-Language` header to our `I18nProvider`.

```tsx
interface RootRouteData {
  defaultLanguage: string;
  acceptLanguage: string;
}

export const loader: LoaderFunction = async ({ request }): Promise<RootRouteData> => {
  const acceptLanguage = request.headers.get('Accept-Language') || '*';
  const defaultLanguage = 'en-US';

  return {
    acceptLanguage,
    defaultLanguage,
  };
};
```

Next, we access the data in our App component and configure our `I18nProvider`:

```tsx
export default function App() {
  const { acceptLanguage, defaultLanguage } = useLoaderData<RootRouteData>()
  return (
    <I18nProvider config={{acceptLanguage, defaultLanguage}}>
      <Document>
        <Layout>
          <Outlet />
        </Layout>
      </Document>
    </I18nProvider>
  );
}
```

Remember that we fetched our localized strings from Particular.Cloud into our `node_modules` folder by running `npx particular.cloud texts`? Based on the `Accept-Language` header, i18n-react can now find the best match for the user! 😎

Let's localize our Remix application, shall we?

## Use the useText hook

Open the `index.tsx` file of our application at `/app/index.tsx`. Let's import the `useText` hook from `@particular.cloud/i18n-react`.

```tsx
const { useT } = require('@particular/i18n-react');
```

We use the useText hook to query the localized text for the current language. Replace the content of `<main>` with the following:

```tsx
<main>
  <h1>{useText({ key: 'landingPage-h1' })}</h1>
  <p>
    {useText({ key: 'landingPage-intro' })}
  </p>
</main>
```

> If you are using the VS Code extension: Did you notice the autocomplete? Check out what happens if you hover over the text key? Isn't that so cool?

And run your application via `npm run dev`.

Awesome! You integrated Particular.Cloud into your Remix project! 🎉

### Document language

Let's head back to `root.tsx`.

One great thing about Remix is that it gives you full control over the HTML document. With Particular.Cloud, we can further make sure that the entire document will be localized.

Let's use the `useLanguage` hook to set the document language.

```tsx
import { I18nProvider, useLanguage } from '@particular.cloud/i18n-react';
```

Adapt the Document component like this:

```tsx
function Document({
  children,
  title
}: {
  children: React.ReactNode;
  title?: string;
}) {
  // get the currently used language from @particular.cloud/i18n-react
  const { langCodeOrLocale } = useLanguage();
  return (
    <html lang={langCodeOrLocale?.split('-')[0] || 'en'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
```

Now the document language will fit the currently displayed language based on the `Accept-Language` header. Wasn't that easy?

### MetaFunction and Particular.Cloud

Next, let's also edit the page title and other meta tags! Again, Remix makes this very easy.

Open the `index.tsx` file of our application at `/app/index.tsx`. First, let's import the i18n object from `@particular.cloud/i18n-react`. It's a re-export of `@particular.cloud/i18n-js` and enables us to translate outside of React-world.

```tsx
import { i18n, useText } from '@particular.cloud/i18n-react';
```

Now, we can use the t (translate) function to translate our meta tags.

```tsx
export let meta: MetaFunction = () => {
  return {
    title: i18n.t({ key: 'landingPage-title' }),
    description: i18n.t({ key: 'landingPage-intro' })
  };
};
```

And we are all set! 🚀

### Enable CDN caching through a URL query parameter

Remix is all about the network tab - reducing the load transferred to the client - and Particular.Cloud provides all the means to do so! Let's navigate to `app/root.tsx` one more time to alter our loader function.

So far, we use the `Accept-Language` header to determine the language of the user. We take this a step further. Let's add a URL search parameter `locale`, which explicitly sets the language. In case, it is not set, we fallback to the `Accept-Language` header.

Also, we make sure that the URL search parameter is removed for our default language.

> Remix does not provie an API to programatically alter the routes of an application (yet). That's why URL params are hard to implement right now. But URL search parameters are good enough!


Let's import the following from `@particular.cloud/i18n-react`:

```tsx
import { I18nProvider, useLanguage, languages, i18n } from '@particular.cloud/i18n-react';
```

Next we add helper functions to our `root.tsx` file:

```tsx
/**
 * Helper function to decide if we accept a locale from the search params
 */
const isLocaleSupported = (locale: string) => {
  if(!locale) {
    return false;
  }

  const language = languages.find(l => l.language.locale === locale);
  // in development we support all languages
  if(process.env.NODE_ENV === 'development') {
    return !!language
  }

  // on production, we only want to support languages set to active on Particular.Cloud
  return language?.isActive;
}

/**
 * Helper function to find the best working language for a language code or locale
 */
const findLanguageFor = (langCodeOrLocale: string) => {
  // finde language for locale based on the project languages loaded into @particular.cloud/texts
  let language = languages.find(l => l.language.locale === langCodeOrLocale);
  if(!language) {
    // find default language for language code (as specified on Particular.Cloud)
    languages.find(l => l.language.langCode === langCodeOrLocale && l.isDefault);
  }

  if(!language) {
    return undefined;
  }

  // on production, we only support languages set to active on Particular.Cloud
  if(process.env.NODE_ENV === 'production' && !language.isActive) {
    return undefined
  }

  return language;
}
```

Awesome! Now let's adapt the loader as described before:

```tsx
/**
 * Get Accept-Language header from request
 * and locale param from URL search params
 * If locale is set and supported, use it as the language
 * Else use best fit from Accept-Language or fallback to defaultLanguage
 * Redirect to URL with locale param to enable caching on CDNs
 */
export const loader: LoaderFunction = ({ request }): RootRouteData | Response => {
  const acceptLanguage = request.headers.get('Accept-Language') || '*';
  const defaultLanguage = 'en-US';

  const url = new URL(request.url);
  const locale = url.searchParams.get('locale') || '';

  if(isLocaleSupported(locale)) {
    i18n.init({ acceptLanguage: locale, defaultLanguage });
    const bestFittingLocale = i18n.getLangCodeOrLocale();
    return {
      acceptLanguage: locale,
      defaultLanguage,
    };
  }

  // init i18n to find the best fitting language for the user
  i18n.init({ acceptLanguage, defaultLanguage });
  const bestFittingLocale = i18n.getLangCodeOrLocale();
  if(bestFittingLocale) {
    const language = findLanguageFor(bestFittingLocale);
    if(language && language.language.locale !== defaultLanguage) {  
      const url = new URL(request.url);
      url.searchParams.set('locale', language.language.locale);
      return redirect(url.toString());
    }
  }

  return {
    acceptLanguage, defaultLanguage,
  }
};
```

Yes, that's a bit more boilerplate code and also harder to grasp. But now we have a working CDN caching solution! 🚀

## Next steps

### Refactor strings to use the useText hook

Use the VS Code extension to refactor strings to use the useText hook without leaving the editor.

You can find a short video detailing the keyboard shortcuts here in the [VS Code documentation](https://particular.cloud/documentation/developers/vscode/creation).
