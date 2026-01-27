import { Table, Column, DataType, Model, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript'
import User from './User'

@Table({ tableName: 'tasks' })
class Tasks extends Model {
  delete(arg0: { where: { id: string | string[] } }) {
    throw new Error("Method not implemented.")
  }
  @AllowNull(false)
  @Column({ type: DataType.STRING(50) })
  declare title: string

  @AllowNull(false)
  @Column({ type: DataType.STRING(200) })
  declare description: string

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  declare icon: number

  @AllowNull(false)
  @Column({ type: DataType.STRING(10) })
  declare status: string

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'userId'
  })
  declare userId: number

  @BelongsTo(() => User)
  declare user: User
}
export default Tasks