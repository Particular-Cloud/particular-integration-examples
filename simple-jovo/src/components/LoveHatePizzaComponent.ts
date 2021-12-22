import { Component, BaseComponent, Intents } from '@jovotech/framework';
import i18n from '@particular.cloud/i18n-js';

import { YesNoOutput } from '../output/YesNoOutput';

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
| A component consists of handlers that respond to specific user requests
| Learn more here: www.jovo.tech/docs/components, jovo.tech/docs/handlers
|
*/
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
