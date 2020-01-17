import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Member: {},
  Preference: {},
  Meetup: {},
};

const pluralNames = { Meetup: 'meetup' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
