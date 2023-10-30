import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, PrimaryKey, Table, Model } from "sequelize-typescript";
import { ClientModel } from "src/client/client.model";
import { CommentModel } from "src/comments/comment.model";
import { OrderStatusesModel } from "src/order_statuses/order_statuses.model";
import { UserModel } from "src/user/user.model";
import { WorkDoneModel } from "src/work_done/work_done.model";

@Table({tableName: 'orders', timestamps: true})
export class OrderModel extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column({type: DataType.INTEGER})
    id: number

    @AllowNull(false)
    @Column({type: DataType.TEXT})
    entry: string

    @AllowNull(false)
    @Column({type: DataType.STRING(255)})
    device: string

    @AllowNull(false)
    @Column({type: DataType.STRING(255)})
    code: string

    @AllowNull(false)
    @Column({type: DataType.DATE})
    createdAt: Date

    @Column({type: DataType.DATE})
    updatedAt: Date

    @Column({type: DataType.DATE})
    deletedAt: Date

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER})
    created_by_id: number

    @BelongsTo(() => UserModel, {foreignKey: 'created_by_id', as: 'createdBy'})
    user: UserModel

    @ForeignKey(() => OrderStatusesModel)
    @Column({type: DataType.INTEGER})
    order_status_id: number

    @BelongsTo(() => OrderStatusesModel, {foreignKey: 'order_status_id', as: 'orderStatus'})
    order_status: OrderStatusesModel

    @ForeignKey(() => ClientModel)
    @Column({type: DataType.INTEGER})
    client_id: number

    @BelongsTo(() => ClientModel, {foreignKey: 'client_id', as: 'client'})
    client: ClientModel

    @HasMany(() => WorkDoneModel)
    works_done: WorkDoneModel[]

    @HasMany(() => CommentModel)
    comments: CommentModel[]
    
}