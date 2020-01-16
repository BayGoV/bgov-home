import { VersionedDataTransferObject } from './versioned-data-transfer-object';

export class Preference extends VersionedDataTransferObject {
  id: string;
  doNotDisturb: boolean;
  inviteMeToActivities: boolean;
  inviteMeToTournaments: boolean;
  inviteMeToDoodles: boolean;
}
