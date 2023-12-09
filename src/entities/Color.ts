import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("colors")
export class Color {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  hexadecimal: string;
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
