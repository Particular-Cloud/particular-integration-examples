import type { PluginConfig } from '@jovotech/framework';
import { Plugin, Extensible, HandleRequest, InvalidParentError, App } from '@jovotech/framework';
import type { ParticularConfig } from '@particular.cloud/i18n-js';
import i18n from '@particular.cloud/i18n-js';

export interface ParticularlyI18nConfig extends PluginConfig {
  config: ParticularConfig;
}

/**
 * #noStringsAttached
 * Simple custom plugin to add Particular.Cloud as a middleware (plugin)
 */
export class ParticularlyI18n extends Plugin<ParticularlyI18nConfig> {
  install(extensible: Extensible) {
    if (!(extensible instanceof App)) {
      throw new InvalidParentError(this.constructor.name, App);
    }
    // called once when plugin is installed
    i18n.init(this.config.config);
  }

  mount(extensible: Extensible) {
    if (!(extensible instanceof HandleRequest)) {
      throw new InvalidParentError(this.constructor.name, HandleRequest);
    }
    extensible.middlewareCollection.use('dialogue.start', (jovo) => {
      // update default language based on user request
      i18n.setDefaultLanguage(jovo.$request.getLocale());
    });
  }

  getDefaultConfig() {
    return {
      config: {},
    };
  }
}
