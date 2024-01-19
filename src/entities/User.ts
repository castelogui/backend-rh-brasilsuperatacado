import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { FormatCustomDate } from "../utils/formatCustomDate";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;
  @Column()
  username: string;
  @Column()
  name: string;
  @Column()
  password: string;
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
