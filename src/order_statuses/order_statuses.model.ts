import { AllowNull, AutoIncrement, Column, DataType, HasMany, PrimaryKey, Table, Model} from "sequelize-typescript";
import { OrderModel } from "src/order/order.model";

@Table
export class OrderStatusesModel extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({type: DataType.INTEGER})
    id: number

    @AllowNull(false)
    @Column({type: DataType.STRING})
    status: string

    @HasMany(() => OrderModel)
    orders: OrderModel[]


}