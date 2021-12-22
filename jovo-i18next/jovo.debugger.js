const { DebuggerConfig } = require('@jovotech/plugin-debugger');

const debuggerConfig = new DebuggerConfig({
  // Note: i18next requires precise matches
  // langCodes won't work unless we explicitly set them as resourcess in /src/app.ts
  locales: ['en-US', 'de-DE'],
  buttons: [
    {
      label: 'LAUNCH',
      input: {
        type: 'LAUNCH',
      },
    },
    {
      label: 'Yes',
      input: {
        intent: 'YesIntent',
      },
    },
    {
      label: 'No',
      input: {
        intent: 'NoIntent',
      },
    },
    // ...
  ],
});

module.exports = debuggerConfig;
