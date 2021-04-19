import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import ProjectEntity from './project.entity';
import CommentEntity from './comment.entity';

@Entity()
export default class EmployerEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  phoneNumber: number;

  // 1:n relation with ProjectEntity 
  @OneToMany( type => ProjectEntity , project => project.employer)
  projects: ProjectEntity [];

  // 1:n relation with CommentEntity 
  @OneToMany( type => CommentEntity , comment => comment.employer)
  comments: CommentEntity [];
}