import { ViewType, ViewKey } from 'twenty-shared/types';

import { type FlatView } from 'src/engine/metadata-modules/flat-view/types/flat-view.type';
import {
  createStandardViewFlatMetadata,
  type CreateStandardViewArgs,
} from 'src/engine/workspace-manager/twenty-standard-application/utils/view/create-standard-view-flat-metadata.util';

export const computeStandardSocialMediaAccountViews = (
  args: Omit<CreateStandardViewArgs<'socialMediaAccount'>, 'context'>,
): Record<string, FlatView> => {
  return {
    allSocialMediaAccounts: createStandardViewFlatMetadata({
      ...args,
      objectName: 'socialMediaAccount',
      context: {
        viewName: 'allSocialMediaAccounts',
        name: 'All {objectLabelPlural}',
        type: ViewType.TABLE,
        key: ViewKey.INDEX,
        position: 0,
        icon: 'IconShare3',
      },
    }),
    socialMediaAccountRecordPageFields: createStandardViewFlatMetadata({
      ...args,
      objectName: 'socialMediaAccount',
      context: {
        viewName: 'socialMediaAccountRecordPageFields',
        name: 'Social Media Account Record Page Fields',
        type: ViewType.FIELDS_WIDGET,
        key: null,
        position: 0,
        icon: 'IconShare3',
      },
    }),
  };
};
