import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, PrimaryKey, Table, Model } from "sequelize-typescript";
import { ClientModel } from "src/client/client.model";
import { CommentModel } from "src/comments/comment.model";
import { GuaranteeModel } from "src/guarantees/guarantee.model";
import { OrderStatusesModel } from "src/order_statuses/order_statuses.model";
import { PaymentMethodModel } from "src/payment_methods/payment_methods.model";
import { UserModel } from "src/user/user.model";
import { WorkDoneModel } from "src/work_done/work_done.model";

@Table({tableName: 'receipts', timestamps: true, deletedAt: false, updatedAt: false})
export class ReceiptModel extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column({type: DataType.INTEGER})
    id: number

    @AllowNull(false)
    @Column({type: DataType.TEXT})
    description: string

    @AllowNull(false)
    @Column({type: DataType.INTEGER})
    total: number

    @AllowNull(false)
    @Column({type: DataType.DATE})
    createdAt: Date

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER})
    created_by_id: number

    @BelongsTo(() => UserModel, {foreignKey: 'created_by_id', as: 'createdBy'})
    userCreating: UserModel

    @ForeignKey(() => PaymentMethodModel)
    @Column({type: DataType.INTEGER})
    payment_method_id: number

    @BelongsTo(() => PaymentMethodModel, {foreignKey: 'payment_method_id', as: 'paymentMethod'})
    payment_method: PaymentMethodModel

    @ForeignKey(() => GuaranteeModel)
    @Column({type: DataType.INTEGER})
    guarantee_id: number

    @BelongsTo(() => GuaranteeModel, {foreignKey: 'guarantee_id', as: 'guaranteeTime'})
    guarantee: GuaranteeModel

    
}