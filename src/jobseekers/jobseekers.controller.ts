import { Body, Controller, Get, ParseIntPipe, Post, Put , Delete, Param} from '@nestjs/common';
import { JobseekersService } from './jobseekers.service';
import ProjectDto from './dto/project.dto';
import CommentDto from './dto/comment.dto';
import JobRequestDto from './dto/jobRequest.dto';
import DepositeRequestDto from './dto/depositeRequest.dto';
import EmployerDto from './dto/employer.dto';
import FreelancerDto from './dto/freelancer.dto';
import ProjectEntity from '../db/project.entity';
import CommentEntity from '../db/comment.entity';
import JobRequestEntity from '../db/jobRequest.entity';
import DepositeRequestEntity from '../db/depositRequest.entity';

@Controller('jobseekers')
export class JobseekersController {
    constructor(private readonly jobseekersService: JobseekersService) {}

    @Post('employers')
    postEmployer( @Body() user: FreelancerDto) {
      let msg: string;
      msg = `Project #${user.id}-${user.name} added.`
      return msg;
    }
    @Post('freelancers')
    postFreelancer( @Body() user: EmployerDto) {
      let msg: string;
      msg = `Project #${user.id}-${user.name} added.`
      return msg;
    }
  @Post('projects')
  postProject( @Body() user: ProjectDto) {
    let msg: string;
    msg = `Project #${user.projectID}-${user.projectName} with userID ${user.userID} added.`
    return msg;
  }
  @Post('comments')
  postComment( @Body() user: CommentDto) {
    let msg: string;
    msg = `Project #${user.commentID} with score ${user.score} userID ${user.userID} added.`
    return msg;
    //return this.jobseekersService.insertComment(user);
  }
  @Post('jobRequests')
  postJobRequest( @Body() user: JobRequestDto) {
    let msg: string;
    msg = `Project #${user.jobRequestID} with userID ${user.userID} added.`
    return msg;
  }
  @Post('depositeRequests')
  postdepositRequests( @Body() user: DepositeRequestDto) {
    let msg: string;
    msg = `Project #${user.depositRequestID} with userID ${user.userID} added.`
    return msg;
  }
  

@Get(':userID/projects')
getProjects(@Param('userID') id: number) {
    return this.jobseekersService.getProjectsOfEmployer(id);
  }

@Get(':userID/comments')
getComments( @Param('userID') id: number ,@Body('empID', ParseIntPipe) empID: number ) {
      return this.jobseekersService.getCommentsOfEmployer(id);
    }

@Get(':userID/jobRequests')
getJobRequests(@Param('userID') id: number , @Body('freeID', ParseIntPipe) freeID: number ) {
        return this.jobseekersService.getJobRequestsOfFreelancer(id);
      }

@Get(':userID/depositeRequests')
getDepositeRequests(@Param('userID') id: number , @Body('freeID', ParseIntPipe) freeID: number ) {
              return this.jobseekersService.getDepositRequestsOfEmployer(id);
            }

@Put(':id/projects')
Update_Project(@Param('id') id: number ,@Body() newValue: ProjectDto){
return this.jobseekersService.updateProject(id,newValue);
            }
@Put(':id/comments')
Update_Comment(@Param('id') id: number ,newValue: CommentDto){
 return this.jobseekersService.updateComment(id,newValue);
                        }
@Put(':id/jobRequests')
update_JobRequest(@Param('id') id: number ,newValue: JobRequestDto){
return this.jobseekersService.updateJobRequest(id,newValue);
                        }
@Put(':id/depositeRequests')
update_DepositRequest(@Param('id') id: number ,newValue: DepositeRequestDto){
return this.jobseekersService.updateDepositRequest(id,newValue);
                        }
  @Delete(':id/projects')
  DeleteProject(@Param('id') id: number){
  return this.jobseekersService.deleteProject(id);
                        }

  @Delete(':id/comments')
  DeleteComment(@Param('id') id: number ,@Body() userID: number){
    return this.jobseekersService.deleteComment(id);
  }

  @Delete(':id/jobRequests')
  DeleteJobRequest(@Param('id') id: number ,@Body() userID: number){
    return this.jobseekersService.deleteJobRequest(id);
  }

  @Delete(':id/depositeRequests')
  DeleteUser(@Param('id') id: number ,@Body() userID: number){
    return this.jobseekersService.deleteDepositeRequest(id);
  }
}
