import { Injectable } from '@nestjs/common';
import EmployerEntity from '../db/employer.entity';
import FreelancerEntity from '../db/freelancer.entity';
import ProjectEntity from '../db/project.entity';
import CommentEntity from '../db/comment.entity';
import JobRequestEntity from '../db/jobRequest.entity';
import DepositeRequestEntity from '../db/depositRequest.entity';
import ProjectDto from './dto/project.dto';
import CommentDto from './dto/comment.dto';
import JobRequestDto from './dto/jobRequest.dto';
import DepositeRequestDto from './dto/depositeRequest.dto';
import EmployerDto from './dto/employer.dto';
import FreelancerDto from './dto/freelancer.dto';

import {getConnection , DeleteResult} from "typeorm";

@Injectable()
export class JobseekersService {

  async insertEmployer(employerDetails: EmployerDto): Promise<EmployerEntity> {
    const employerEntity: EmployerEntity = EmployerEntity.create();
    const {id , name ,  phoneNumber } = employerDetails;
    employerEntity.id = id;
    employerEntity.name = name;
    employerEntity.phoneNumber = phoneNumber;
    await EmployerEntity.save(employerEntity);
    return employerEntity;
  }

  async insertFreelancer(freelancerDetails: FreelancerDto): Promise<FreelancerEntity> {
    const freelancerEntity: FreelancerEntity = FreelancerEntity.create();
    const {id , name , WorkExperience , skill , phoneNumber } = freelancerDetails;
    freelancerEntity.id = id;
    freelancerEntity.name = name;
    freelancerEntity.WorkExperience = WorkExperience;
    freelancerEntity.skill = skill;
    freelancerEntity.phoneNumber = phoneNumber;
    await FreelancerEntity.save(freelancerEntity);
    return freelancerEntity;
  }

  async insertProject(projectDetails: ProjectDto): Promise<ProjectEntity> {
    const projectEntity: ProjectEntity = ProjectEntity.create();
    const {projectID,projectName , userID , type , deadline , price  } = projectDetails;
    projectEntity.id = projectID;
    projectEntity.name = projectName;
    projectEntity.employer.id = userID;
    projectEntity.type = type;
    projectEntity.deadline = deadline;
    projectEntity.price = price;
    const employer: EmployerEntity = await EmployerEntity.findOne(userID);
    employer.projects[employer.projects.length] = projectEntity;
    await ProjectEntity.save(projectEntity);
    return projectEntity;
  }
  async insertComment(commentDetails: CommentDto): Promise<CommentEntity> {
    const commentEntity: CommentEntity = CommentEntity.create();
    const {commentID , userID , description , date , score } = commentDetails;
    commentEntity.id = commentID;
    commentEntity.employer.id = userID;
    commentEntity.description =description;
    commentEntity.date = date;
    commentEntity.score = score;
    const employer: EmployerEntity = await EmployerEntity.findOne(userID);
    employer.comments[employer.comments.length] = commentEntity;
    await CommentEntity.save(commentEntity);
    return commentEntity;
  }
  async insertJobRequest(jobRequestDetails: JobRequestDto): Promise<JobRequestEntity> {
    const jobRequestEntity: JobRequestEntity = JobRequestEntity.create();
    const {jobRequestID , userID , description , date} = jobRequestDetails;
    jobRequestEntity.id = jobRequestID;
    jobRequestEntity.freelancer.id = userID;
    jobRequestEntity.description = description;
    jobRequestEntity.date = date;
    const freelancer: FreelancerEntity = await FreelancerEntity.findOne(userID);
    freelancer.jobRequests[freelancer.jobRequests.length] = jobRequestEntity;
    await JobRequestEntity.save(jobRequestEntity);
    return jobRequestEntity;
  }
  async insertDepositRequest(depositeRequestDetails: DepositeRequestDto): Promise<DepositeRequestEntity> {
    const depositRequestEntity: DepositeRequestEntity = DepositeRequestEntity.create();
    const {depositRequestID , userID , description , date} = depositeRequestDetails;
    depositRequestEntity.id = depositRequestID;
    depositRequestEntity.freelancer.id = userID;
    depositRequestEntity.description = description;
    depositRequestEntity.date = date;
    const freelancer: FreelancerEntity = await FreelancerEntity.findOne(userID);
    freelancer.depositRequests[freelancer.depositRequests.length] = depositRequestEntity;
    await DepositeRequestEntity.save(depositRequestEntity);
    return depositRequestEntity;
  }

    async getProjectsOfEmployer(empID: number):Promise<ProjectEntity[]> {
        console.log(typeof(empID));
        const user: EmployerEntity = await EmployerEntity.findOne({where: {id: empID}, relations: ['projects']});
        return user.projects;
      }

    async getCommentsOfEmployer(empID: number): Promise<CommentEntity[]> {
        console.log(typeof(empID));
        const user: EmployerEntity = await EmployerEntity.findOne({where: {id: empID}, relations: ['comments']});
        return user.comments;
      }

    async getJobRequestsOfFreelancer(freeID: number): Promise<JobRequestEntity[]> {
        console.log(typeof(freeID));
        const user: FreelancerEntity = await FreelancerEntity.findOne({where: {id: freeID}, relations: ['jobRequests']});
        return user.jobRequests;
      }
    
    async getDepositRequestsOfEmployer(freeID: number): Promise<DepositeRequestEntity[]> {
        console.log(typeof(freeID));
        const user:  FreelancerEntity = await  FreelancerEntity.findOne({where: {id: freeID}, relations: ['depositRequests']});
        return user.depositRequests;
      }

    async updateProject(
        project_id : number,
        project: ProjectDto,
      ): Promise<ProjectEntity | null> {
        const newValue = await ProjectEntity.findOneOrFail(project_id);
        if (!newValue.id) {
          // tslint:disable-next-line:no-console
          console.error("Doesn't exist");
        }
        const {projectID,projectName , userID , type , deadline , price  } = project;
            newValue.id = projectID;
            newValue.name = projectName;
            newValue.employer.id = userID;
            newValue.type = type;
            newValue.deadline = deadline;
            newValue.price = price;
            await ProjectEntity.save(newValue);
            return newValue;
            }

    async updateComment(
        comment_id: number,
        comment: CommentDto,
      ): Promise<CommentEntity | null> {
        const newValue = await CommentEntity.findOneOrFail(comment_id);
        if (!newValue.id) {
          // tslint:disable-next-line:no-console
          console.error("Doesn't exist");
        }
        const {commentID , userID , description , date , score } = comment;
        newValue.id = commentID;
        newValue.employer.id = userID;
        newValue.description =description;
        newValue.date = date;
        newValue.score = score;
        await CommentEntity.save(newValue);
        return newValue;
      }

    async updateJobRequest(
        jobRequest_id: number,
        jobRequest: JobRequestDto,
      ): Promise<JobRequestEntity | null> {
        const newValue = await JobRequestEntity.findOneOrFail(jobRequest_id);
        if (!newValue.id) {
          // tslint:disable-next-line:no-console
          console.error("Doesn't exist");
        }
        const {jobRequestID , userID , description , date} = jobRequest;
        newValue.id = jobRequestID;
        newValue.freelancer.id = userID;
        newValue.description = description;
        newValue.date = date;
        await JobRequestEntity.save(newValue);
        return newValue;
      }
    
    async updateDepositRequest(
        depositeRequest_id: number,
        depositeRequest: DepositeRequestDto,
      ): Promise<DepositeRequestEntity | null> {
        const newValue = await DepositeRequestEntity.findOneOrFail(depositeRequest_id);
        if (!newValue.id) {
          // tslint:disable-next-line:no-console
          console.error("Doesn't exist");
        }
        const {depositRequestID , userID , description , date} = depositeRequest;
        newValue.id = depositRequestID;
        newValue.freelancer.id = userID;
        newValue.description = description;
        newValue.date = date;
        await DepositeRequestEntity.save(newValue);
        return newValue;
      }

    async deleteProject(ID: number): Promise<DeleteResult> {
        return await ProjectEntity.delete(ID);
      }
    async deleteComment(ID: number): Promise<DeleteResult> {
        return await CommentEntity.delete(ID);
      }
    async deleteJobRequest(ID: number): Promise<DeleteResult> {
        return await JobRequestEntity.delete(ID);
      }
    async deleteDepositeRequest(ID: number): Promise<DeleteResult> {
        return await DepositeRequestEntity.delete(ID);
      }

      
}
