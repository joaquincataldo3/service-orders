import { Table, Model, Column, DataType, PrimaryKey, AllowNull, ForeignKey, BelongsTo } from "sequelize-typescript";
import { OrderModel } from "src/order/order.model";
import { UserModel } from "src/user/user.model";

@Table({tableName: 'works_done'})
export class WorkDoneModel extends Model {

    @PrimaryKey
    @Column({type: DataType.INTEGER})
    id: number

    @AllowNull(false)
    @Column({type: DataType.TEXT})
    description: string


    @ForeignKey(() => OrderModel)
    @Column({type: DataType.INTEGER})
    order_id: number

    @BelongsTo(() => OrderModel, {foreignKey: 'order_id', as: 'order'})
    order: OrderModel

    @ForeignKey(() => UserModel)
    user_id: number

    @BelongsTo(() => UserModel, {foreignKey: 'user_id', as: 'user'})
    user: UserModel

    

}