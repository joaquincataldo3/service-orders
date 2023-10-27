import { AllowNull, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderModel } from "src/order/order.model";

@Table({tableName: 'clients'})
export class ClientModel extends Model {
    @PrimaryKey
    @Column({type: DataType.INTEGER})
    id: number

    @AllowNull(false)
    @Column({type: DataType.STRING(255)})
    first_name: string

    @AllowNull(false)
    @Column({type: DataType.STRING(255)})
    last_name: string

    @HasMany(() => OrderModel)
    orders: OrderModel[]
}