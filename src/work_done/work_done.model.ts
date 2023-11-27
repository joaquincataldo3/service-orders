import { Table, Model, Column, DataType, PrimaryKey, AllowNull, ForeignKey, BelongsTo, AutoIncrement } from "sequelize-typescript";
import { OrderModel } from "src/order/order.model";
import { UserModel } from "src/user/user.model";

@Table({tableName: 'works_done', timestamps: false})
export class WorkDoneModel extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column({type: DataType.INTEGER})
    id: number

    @AllowNull(false)
    @Column({type: DataType.TEXT})
    description: string

    @AllowNull(false)
    @Column({type: DataType.TINYINT})
    edited: number

    @ForeignKey(() => OrderModel)
    @Column({type: DataType.INTEGER})
    order_id: number

    @AllowNull(false)
    @Column({type: DataType.DATE})
    createdAt: Date

    @BelongsTo(() => OrderModel, {foreignKey: 'order_id', as: 'order'})
    order: OrderModel

    @ForeignKey(() => UserModel)
    user_id: number

    @BelongsTo(() => UserModel, {foreignKey: 'user_id', as: 'user'})
    user: UserModel

}