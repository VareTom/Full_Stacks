import { IsEnum, IsString } from "class-validator";
import { AllowNull, Column, DataType, Default, IsUrl, IsUUID, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

// Enums
import { StackCategory } from "src/enums/stack-category";

@Table({
    timestamps: true,
    paranoid: true
})
export class Stack extends Model<Stack> {
    @PrimaryKey
    @IsUUID(4)
    @Default(DataType.UUIDV4)
    @Unique
    @Column
    uuid: string;

    @IsString()
    @AllowNull(false)
    @Column
    name: string;

    @IsString()
    @Column
    description: string;

    @IsUrl
    @Column({field: 'web_site_url'})
    webSiteUrl: string;

    @IsString()
    @Column({field: 'logo_url'})
    logoUrl: string;

    @IsEnum(StackCategory)
    @AllowNull(false)
    @Column
    category: StackCategory;
}