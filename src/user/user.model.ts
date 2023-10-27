import { Column, Model, Table, AllowNull, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { CommentModel } from 'src/comments/comment.model';
import { OrderModel } from 'src/order/order.model';
import { WorkDoneModel } from 'src/work_done/work_done.model';

@Table({tableName: 'users', timestamps: false})
export class UserModel extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({type: DataType.INTEGER})
  id: number;

  @AllowNull(false)
  @Column({type: DataType.STRING})
  username: string;

  @AllowNull(false)
  @Column({type: DataType.STRING})
  email: string;

  @AllowNull(false)
  @Column({type: DataType.STRING})
  password: string;

  @HasMany(() => OrderModel)
  order: OrderModel

  @HasMany(() => CommentModel)
  comments: CommentModel

  @HasMany(() => WorkDoneModel)
  works_done: WorkDoneModel[]

}