// Enums
import { Providers } from 'src/shared/enums/Providers';

export class User {
  uuid: string;
  identifier: string;
  profilePictureUrl: string;

  provider: Providers;

  createdAt: string;
  updatedAt: string;
  deletedAt: string;

  constructor(json: Partial<User>) {
    this.uuid = json.uuid;
    this.identifier = json.identifier;
    this.profilePictureUrl = json.profilePictureUrl;

    if (Object.values(Providers).includes(json.provider)) this.provider = json.provider;

    this.createdAt = json.createdAt;
    this.updatedAt = json.updatedAt;
    this.deletedAt = json.deletedAt;
  }
}