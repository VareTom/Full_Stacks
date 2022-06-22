import {
  AllowNull,
  Column,
  DataType,
  Default, Index,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import { IsEnum, IsString } from 'class-validator';

// Enums
import { Providers } from 'src/enums/providers';

@Table({
  timestamps: true,
  paranoid: true
})
export class User extends Model<User> {
  
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Unique
  @Column
  uuid: string;
  
  @IsString()
  @Index({unique: true})
  @AllowNull(false)
  @Column
  identifier: string;

  @IsEnum(Providers)
  @AllowNull(false)
  @Column
  provider: Providers;

  @IsString()
  @Column
  profile_picture_url: string;
}
