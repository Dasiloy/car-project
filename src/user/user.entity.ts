import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
