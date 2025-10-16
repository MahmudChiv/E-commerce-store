import { Table, Column, Model, DataType, PrimaryKey } from "sequelize-typescript";

@Table
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  firstName!: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password!: string;
}
