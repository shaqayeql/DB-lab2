import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import JobRequestEntity from './jobRequest.entity';
import DepositeRequestEntity from './depositRequest.entity';

@Entity()
export default class FreelancerEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  WorkExperience: string;

  @Column({ length: 500 })
  skill: string;

  @Column()
  phoneNumber: number;

  // 1:n relation with JobRequestEntity 
  @OneToMany( type => JobRequestEntity , jobRequest => jobRequest.freelancer)
  jobRequests: JobRequestEntity [];

  // 1:n relation with DepositeRequestEntity 
  @OneToMany( type => DepositeRequestEntity , depositRequest => depositRequest.freelancer)
  depositRequests: DepositeRequestEntity [];
}