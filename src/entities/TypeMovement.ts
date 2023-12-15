import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("type_movement")
export class TypeMovement {
  @PrimaryColumn()
  id: string;
  @Column()
  code: string;
  @Column()
  type: string;
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
