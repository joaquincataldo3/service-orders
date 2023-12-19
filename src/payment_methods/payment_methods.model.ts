import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, PrimaryKey, Table, Model } from "sequelize-typescript";
import { ReceiptModel } from "src/receipt/receipt.model";

@Table({tableName: 'payment_methods', timestamps: false})
export class PaymentMethodModel extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column({type: DataType.INTEGER})
    id: number

    @AllowNull(false)
    @Column({type: DataType.TEXT})
    method: string

    @HasMany(() => ReceiptModel, {foreignKey: 'guarantee_id', as: 'receipt'})
    receipt: ReceiptModel[]
    
}