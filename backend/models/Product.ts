import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasMany
} from "sequelize-typescript";
import { ProductCart } from "./ProductCart";

@Table
export class Product extends Model {
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
  productName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  productURL!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price!: number;

  @HasMany(() => ProductCart)
  productCarts!: ProductCart[];
}
