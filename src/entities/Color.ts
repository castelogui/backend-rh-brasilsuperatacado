import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("colors")
export class Color {
  @PrimaryColumn()
  id: string;
  @Column()
  color: string;
  @Column()
  description: string;
  @Column()
  hexadecimal: string;
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
