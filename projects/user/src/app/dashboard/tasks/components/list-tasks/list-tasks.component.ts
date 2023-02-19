import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../services/tasks.service';



@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadLineDate','status', 'actions'];
  dataSource :any =[];
  tasksFilter!:FormGroup;
  userData!:any;
  page!:any;
  totalItems:any=0;
  Selectedstatus:string="In-Progress";
  filteration:any={
    page:this.page,
    limits:10
  }
  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Prossing" , id:2},
  ]
  constructor(public dialog: MatDialog ,
    private fb:FormBuilder,
    private service : TasksService,
    private toaster : ToastrService
    
    
    ) { }

  ngOnInit(): void {
    this.createform()
    this.getUserData()
    this.getAllTasks()
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title:[''],
      userId:[''],
      fromDate:[''],
      toDate:['']
    })
  }
  getUserData(){
    let token = JSON.stringify(localStorage.getItem('token'))
    this.userData = JSON.parse(window.atob(token.split('.')[1]))
    console.log(this.userData);
    

  }
  getAllTasks() {
    let params={
      page:this.page,
      limit:10,
      status:this.Selectedstatus
    }
    //let userId = JSON.stringify(localStorage.getItem('userId'))
    this.service.getUserTasks(this.userData.userId  , params).subscribe((res:any)=>{
      this.dataSource = res.tasks
      this.totalItems=res.totalItems
    }, error=>{
      this.dataSource=[]
    });
    
    

  }
  //fonction de pagination
  changePage(event:any){
    this.page=event
    this.getAllTasks()
   

  }
  complete(ele:any){
    const MODEL={
      id:ele._id,
    }
    this.service.complete(MODEL).subscribe(res=>{
      this.getAllTasks()
      this.toaster.success("Complete suuccfuly","Success")

    })

  }
}
