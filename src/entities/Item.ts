import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";
import { Color } from "./Color";

@Entity("items")
export class Item {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  estoque: number;

  @Column()
  status: boolean;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, {onDelete: "CASCADE"})
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  color_id: string;

  @ManyToOne(() => Color, {onDelete: "CASCADE"})
  @JoinColumn({ name: "color_id" })
  color: Color;

  @Column()
  size: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id || this.id == undefined || this.id == "") {
      this.id = uuid();
    }
    if (!this.created_at || this.created_at == undefined) {
      this.created_at = new Date();
    }
  }
}
