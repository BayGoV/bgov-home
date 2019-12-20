import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Member: {},
  Preference: {}
};

const pluralNames = { };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
