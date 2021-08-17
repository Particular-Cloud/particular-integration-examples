const express = require('express');
const { i18n } = require('@particular.cloud/i18n-js');

const app = express();
const port = process.env.PORT || 3000;

i18n.init({ defaultLanguage: 'en-US' });

app.get('/', (req, res) => {
    // get the accept-language header, e.g. "en-US,en;q=0.8,de;q=0.6"
    const acceptLanguage = req.headers['accept-language'];
    console.log(`user requests page with accept-language: ${acceptLanguage}`);

    // based on defaultLanguage and acceptLanguage header, query best fitting localized text
    i18n.setAcceptLanguage(acceptLanguage);
    const text = i18n.t({ key: 'helloReply' });
    res.send(text);
});

app.listen(port, () => {
    console.log(`Express server listening on http://localhost:${port}`);
});
