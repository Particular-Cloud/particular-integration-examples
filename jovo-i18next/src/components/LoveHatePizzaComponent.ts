import { Component, BaseComponent, Intents } from '@jovotech/framework';

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
    return this.$send(YesNoOutput, { message: this.$t('do-you-like-pizza-prompt') });
  }

  @Intents(['YesIntent'])
  lovesPizza() {
    return this.$send({ message: this.$t('loves-pizza-reply'), listen: false });
  }

  @Intents(['NoIntent'])
  hatesPizza() {
    return this.$send({ message: this.$t('hates-pizza-reply'), listen: false });
  }

  UNHANDLED() {
    return this.START();
  }
}
