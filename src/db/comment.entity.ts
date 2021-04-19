import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany , ManyToOne } from 'typeorm';
import EmployerEntity from './employer.entity';
@Entity()
export default class CommentEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1000 ,default: 0.0})
  description: string;

  @Column({ length: 500 ,default: 0.0})
  date: string;

  @Column({default: 0.0 })
  score: number;

  // n:1 relation with comments
  @ManyToOne(type => EmployerEntity, employer => employer.comments)
  employer: EmployerEntity;
}