import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany , ManyToOne} from 'typeorm';
import EmployerEntity from './employer.entity';
@Entity()
export default class ProjectEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 ,default: 0.0 })
  name: string;

  @Column({ length: 500 ,default: 0.0 })
  type: string;

  @Column({ length: 500 ,default: 0.0 })
  deadline: string;

  @Column({default: 0.0 })
  price: number;

  // n:1 relation with projects
  @ManyToOne(type => EmployerEntity, employer => employer.projects)
  employer: EmployerEntity;
}