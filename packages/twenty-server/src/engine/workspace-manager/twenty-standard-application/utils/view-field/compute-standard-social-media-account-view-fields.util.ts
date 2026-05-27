import { type FlatViewField } from 'src/engine/metadata-modules/flat-view-field/types/flat-view-field.type';
import {
  createStandardViewFieldFlatMetadata,
  type CreateStandardViewFieldArgs,
} from 'src/engine/workspace-manager/twenty-standard-application/utils/view-field/create-standard-view-field-flat-metadata.util';

export const computeStandardSocialMediaAccountViewFields = (
  args: Omit<CreateStandardViewFieldArgs<'socialMediaAccount'>, 'context'>,
): Record<string, FlatViewField> => {
  return {
    allSocialMediaAccountsPlatform: createStandardViewFieldFlatMetadata({
      ...args,
      objectName: 'socialMediaAccount',
      context: {
        viewName: 'allSocialMediaAccounts',
        viewFieldName: 'platform',
        fieldName: 'platform',
        position: 0,
        isVisible: true,
        size: 150,
      },
    }),
    allSocialMediaAccountsHandle: createStandardViewFieldFlatMetadata({
      ...args,
      objectName: 'socialMediaAccount',
      context: {
        viewName: 'allSocialMediaAccounts',
        viewFieldName: 'handle',
        fieldName: 'handle',
        position: 1,
        isVisible: true,
        size: 150,
      },
    }),
    allSocialMediaAccountsUrl: createStandardViewFieldFlatMetadata({
      ...args,
      objectName: 'socialMediaAccount',
      context: {
        viewName: 'allSocialMediaAccounts',
        viewFieldName: 'url',
        fieldName: 'url',
        position: 2,
        isVisible: true,
        size: 150,
      },
    }),
    allSocialMediaAccountsCompany: createStandardViewFieldFlatMetadata({
      ...args,
      objectName: 'socialMediaAccount',
      context: {
        viewName: 'allSocialMediaAccounts',
        viewFieldName: 'company',
        fieldName: 'company',
        position: 3,
        isVisible: true,
        size: 150,
      },
    }),
    allSocialMediaAccountsCreatedAt: createStandardViewFieldFlatMetadata({
      ...args,
      objectName: 'socialMediaAccount',
      context: {
        viewName: 'allSocialMediaAccounts',
        viewFieldName: 'createdAt',
        fieldName: 'createdAt',
        position: 4,
        isVisible: true,
        size: 150,
      },
    }),

    socialMediaAccountRecordPageFieldsPlatform:
      createStandardViewFieldFlatMetadata({
        ...args,
        objectName: 'socialMediaAccount',
        context: {
          viewName: 'socialMediaAccountRecordPageFields',
          viewFieldName: 'platform',
          fieldName: 'platform',
          position: 0,
          isVisible: true,
          size: 150,
        },
      }),
    socialMediaAccountRecordPageFieldsHandle:
      createStandardViewFieldFlatMetadata({
        ...args,
        objectName: 'socialMediaAccount',
        context: {
          viewName: 'socialMediaAccountRecordPageFields',
          viewFieldName: 'handle',
          fieldName: 'handle',
          position: 1,
          isVisible: true,
          size: 150,
        },
      }),
    socialMediaAccountRecordPageFieldsUrl:
      createStandardViewFieldFlatMetadata({
        ...args,
        objectName: 'socialMediaAccount',
        context: {
          viewName: 'socialMediaAccountRecordPageFields',
          viewFieldName: 'url',
          fieldName: 'url',
          position: 2,
          isVisible: true,
          size: 150,
        },
      }),
    socialMediaAccountRecordPageFieldsCompany:
      createStandardViewFieldFlatMetadata({
        ...args,
        objectName: 'socialMediaAccount',
        context: {
          viewName: 'socialMediaAccountRecordPageFields',
          viewFieldName: 'company',
          fieldName: 'company',
          position: 3,
          isVisible: true,
          size: 150,
        },
      }),
    socialMediaAccountRecordPageFieldsCreatedAt:
      createStandardViewFieldFlatMetadata({
        ...args,
        objectName: 'socialMediaAccount',
        context: {
          viewName: 'socialMediaAccountRecordPageFields',
          viewFieldName: 'createdAt',
          fieldName: 'createdAt',
          position: 4,
          isVisible: true,
          size: 150,
          viewFieldGroupName: 'system',
        },
      }),
    socialMediaAccountRecordPageFieldsCreatedBy:
      createStandardViewFieldFlatMetadata({
        ...args,
        objectName: 'socialMediaAccount',
        context: {
          viewName: 'socialMediaAccountRecordPageFields',
          viewFieldName: 'createdBy',
          fieldName: 'createdBy',
          position: 5,
          isVisible: true,
          size: 150,
          viewFieldGroupName: 'system',
        },
      }),
    socialMediaAccountRecordPageFieldsUpdatedAt:
      createStandardViewFieldFlatMetadata({
        ...args,
        objectName: 'socialMediaAccount',
        context: {
          viewName: 'socialMediaAccountRecordPageFields',
          viewFieldName: 'updatedAt',
          fieldName: 'updatedAt',
          position: 6,
          isVisible: true,
          size: 150,
          viewFieldGroupName: 'system',
        },
      }),
    socialMediaAccountRecordPageFieldsUpdatedBy:
      createStandardViewFieldFlatMetadata({
        ...args,
        objectName: 'socialMediaAccount',
        context: {
          viewName: 'socialMediaAccountRecordPageFields',
          viewFieldName: 'updatedBy',
          fieldName: 'updatedBy',
          position: 7,
          isVisible: true,
          size: 150,
          viewFieldGroupName: 'system',
        },
      }),
  };
};
