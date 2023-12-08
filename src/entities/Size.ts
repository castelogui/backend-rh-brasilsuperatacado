import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("sizes")
export class Size {
  @PrimaryColumn()
  id: string;
  @Column()
  size: number;
  @Column()
  description: string;
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
