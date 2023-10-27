import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, PrimaryKey, Table, Model } from "sequelize-typescript";
import { OrderModel } from "src/order/order.model";
import { UserModel } from "src/user/user.model";

@Table({tableName: 'comments'})
export class CommentModel extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column({type: DataType.INTEGER})
    id: number

    @AllowNull(false)
    @Column({type: DataType.TEXT})
    description: string

    @AllowNull(false)
    @Column({defaultValue: Date.now()})
    created_at: Date

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER})
    user_id: number

    @BelongsTo(() => UserModel, {foreignKey: 'user_id', as: 'user'})
    user: UserModel

    @ForeignKey(() => OrderModel)
    @Column({type: DataType.INTEGER})
    order_id: number

    @BelongsTo(() => OrderModel, {foreignKey: 'order_id', as: 'order'})
    order: OrderModel

}