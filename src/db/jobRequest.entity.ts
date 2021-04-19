import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany , ManyToOne } from 'typeorm';
import FreelancerEntity from './freelancer.entity';
@Entity()
export default class JobRequestEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1000 ,default: 0.0 })
  description: string;

  @Column({ length: 500 ,default: 0.0})
  date: string;

  // n:1 relation with jobRequests
  @ManyToOne(type => FreelancerEntity, freelancer => freelancer.jobRequests)
  freelancer: FreelancerEntity;

}