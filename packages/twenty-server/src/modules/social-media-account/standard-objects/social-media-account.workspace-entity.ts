import { FieldMetadataType, type ActorMetadata } from 'twenty-shared/types';

import { type FieldTypeAndNameMetadata } from 'src/engine/workspace-manager/utils/get-ts-vector-column-expression.util';
import { type EntityRelation } from 'src/engine/workspace-manager/workspace-migration/types/entity-relation.interface';
import { type CompanyWorkspaceEntity } from 'src/modules/company/standard-objects/company.workspace-entity';

const PLATFORM_FIELD_NAME = 'platform';
const HANDLE_FIELD_NAME = 'handle';
const URL_FIELD_NAME = 'url';

export const SEARCH_FIELDS_FOR_SOCIAL_MEDIA_ACCOUNT: FieldTypeAndNameMetadata[] = [
  { name: PLATFORM_FIELD_NAME, type: FieldMetadataType.SELECT },
  { name: HANDLE_FIELD_NAME, type: FieldMetadataType.TEXT },
  { name: URL_FIELD_NAME, type: FieldMetadataType.TEXT },
];

export class SocialMediaAccountWorkspaceEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  platform: string | null;
  handle: string | null;
  url: string | null;
  position: number;
  createdBy: ActorMetadata;
  updatedBy: ActorMetadata;
  searchVector: string;

  company: EntityRelation<CompanyWorkspaceEntity> | null;
  companyId: string | null;
}
