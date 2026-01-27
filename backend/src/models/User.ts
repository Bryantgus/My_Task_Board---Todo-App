import { Table, Column, DataType, Model, AllowNull, HasMany, PrimaryKey } from 'sequelize-typescript'
import Tasks from './Tasks'

@Table({ tableName: 'users' })
class User extends Model {

  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    unique: true
  })
  declare userId: number

  @HasMany(() => Tasks, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  declare tasks: Tasks[]
}
export default User