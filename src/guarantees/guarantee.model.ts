import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({tableName: 'guarantees', timestamps: false})
export class GuaranteeModel extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column({type: DataType.INTEGER})
    id: number

    @AllowNull(false)
    @Column({type: DataType.STRING(255)})
    description: string
    
}