import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { TypeMovement } from "./TypeMovement";
import { Item } from "./Item";
import { FormatCustomDate } from "../utils/formatCustomDate";

@Entity("movement")
export class Movement {
  @PrimaryColumn()
  id: string;
  @Column()
  description: string;
  @Column()
  quantity: number;
  @Column()
  type_movement_id: string;
  @ManyToOne(() => TypeMovement, {onDelete: "CASCADE"})
  @JoinColumn({ name: "type_movement_id" })
  type_movement: TypeMovement;
  @Column()
  item_id: string;
  @ManyToOne(() => Item, {onDelete: "CASCADE"})
  @JoinColumn({ name: "item_id" })
  item: Item;
  @Column()
  item_estoque: number
  @Column()
  item_estoque_ant: number
  @CreateDateColumn()
  created_at: Date;
  @CreateDateColumn()
  updated_at: Date;


  constructor() {
    if (!this.id || this.id == undefined || this.id == "") {
      this.id = uuid();
    }
    if (!this.created_at || this.created_at == undefined) {
      this.created_at = new Date(new FormatCustomDate().dateTimeLocal())
    }
  }
}
