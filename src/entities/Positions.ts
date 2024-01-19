import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { FormatCustomDate } from "../utils/formatCustomDate";
import { Department } from "./Department";

@Entity("positions")
export class Positions {
  @PrimaryColumn()
  id: string;
  @Column()
  codigo: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  department_id: string;
  @ManyToOne(() => Department, { onDelete: "CASCADE" })
  @JoinColumn({ name: "departament_id" })
  department: Department;
  @CreateDateColumn()
  created_at: Date;
  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id || this.id == undefined || this.id == "") {
      this.id = uuid();
    }
    if (!this.created_at || this.created_at == undefined) {
      this.created_at = new Date(new FormatCustomDate().dateTimeLocal());
    }
    if (!this.updated_at || this.updated_at == undefined) {
      this.updated_at = new Date(new FormatCustomDate().dateTimeLocal());
    }
  }
}
