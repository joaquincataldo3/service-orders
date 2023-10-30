import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderModel } from "src/order/order.model";

@Table({tableName: 'clients', timestamps: true, updatedAt: false, deletedAt: false})
export class ClientModel extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({type: DataType.INTEGER})
    id: number

    @AllowNull(false)
    @Column({type: DataType.STRING(255)})
    first_name: string

    @AllowNull(false)
    @Column({type: DataType.STRING(255)})
    last_name: string

    @AllowNull(false)
    @Column({type: DataType.DATE})
    createdAt: Date

    @HasMany(() => OrderModel)
    orders: OrderModel[]
}