import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted user with the id of ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`updated user with the id of ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`removed user with the id of ${this.id}`);
  }
}
