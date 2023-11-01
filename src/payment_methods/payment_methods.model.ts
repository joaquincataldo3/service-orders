import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, PrimaryKey, Table, Model } from "sequelize-typescript";
import { ClientModel } from "src/client/client.model";
import { CommentModel } from "src/comments/comment.model";
import { OrderStatusesModel } from "src/order_statuses/order_statuses.model";
import { UserModel } from "src/user/user.model";
import { WorkDoneModel } from "src/work_done/work_done.model";

@Table({tableName: 'receipts', timestamps: true, deletedAt: false, updatedAt: false})
export class PaymentMethodModel extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column({type: DataType.INTEGER})
    id: number

    @AllowNull(false)
    @Column({type: DataType.TEXT})
    method: string


    
}