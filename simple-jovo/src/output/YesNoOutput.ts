import { Jovo, BaseOutput, Output, OutputTemplate } from '@jovotech/framework';
import i18n from '@particular.cloud/i18n-js';

@Output()
export class YesNoOutput extends BaseOutput {
  /*
  |--------------------------------------------------------------------------
  | Output Template
  |--------------------------------------------------------------------------
  |
  | This structured output is later turned into a native response
  | Learn more here: www.jovo.tech/docs/output
  |
  */
  build(): OutputTemplate | OutputTemplate[] {
    const yes = i18n.t({ key: 'yes' });
    const no = i18n.t({ key: 'no' });
    return {
      quickReplies: [yes, no],
      listen: true,
    };
  }
}
