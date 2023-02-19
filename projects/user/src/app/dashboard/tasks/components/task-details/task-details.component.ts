import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  taskId:any
  taskDetails:any;
  constructor(
    private route :ActivatedRoute ,
    private service : TasksService,
    private router : Router,
    private toaster:ToastrService,
  ) { 
    this.route.paramMap.subscribe((res:any)=>{
      console.log(res);
      
      this.taskId = res.params['id']
    })
  }
  ngOnInit(): void {
    this.getTaskDetails()
  }
  getTaskDetails(){
    this.service.taskDetail(this.taskId).subscribe((res:any)=>{
      this.taskDetails=res.tasks
    })
  }
  complete(){
    const MODEL={
      id:this.taskId,
    }
    this.service.complete(MODEL).subscribe(res=>{
      this.router.navigate(['/tasks'])
      this.toaster.success("Complete suuccfuly","Success")

    })

  }


}
