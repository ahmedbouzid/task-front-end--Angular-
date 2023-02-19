import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'projects/admin/src/environments/environment';
import { TasksService } from '../../services/tasks.service';
import { AddTaskComponent } from '../add-task/add-task.component';
export interface PeriodicElement {
  title: string;
  user: string;
  deadline: string;
  status: string;
}


@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadline','status', 'actions'];
  dataSource :any= [];
 public tasksFilter!:FormGroup;
  page:any=1;
  filteration:any={
    page:this.page,
    limit:10
  }
  timeOutId : any ;
  total:any
  users:any = [
    {name:"Moahmed" , id:'63ee50c3af03762098e77447'},
    {name:"Ali" , id:'63ee5170af03762098e7744e'},
 
  ]

  status:any = [
    {name:"Complete"},
    {name:"In-Progress"}
  ]
  constructor(private service : TasksService, public dialog :MatDialog,
    private sppiner :NgxSpinnerService , private  toestr :ToastrService ) { }

  ngOnInit(): void {
    this.getAllTasks()
  }

  
  search(event:any){
    this.filteration["keyword"] = event.value
    //pour la pagination
    this.page=1
    this.filteration['page']=1
    //envoyer le dernier request
    clearTimeout(this.timeOutId)
   this.timeOutId= setTimeout(()=>{
      this.getAllTasks()

    },2000)
  }
  //filtrage par selecttion avec id user selon son nom
  selectUser(event:any){
    //pour la pagination
    this.page=1
    this.filteration['page']=1
    this.filteration['userId'] = event.value
    this.getAllTasks()
  }
  //filtrage par status
  selectStatus(event:any){
    //pour la pagination
    this.page=1
    this.filteration['page']=1
    this.filteration['status'] = event.value.trim()
     this.getAllTasks()
  }
//date filter
selectDate(event : any , type:any){
  //pour la pagination
  this.page=1
  this.filteration['page']=1
  this.filteration[type]=moment(event.value).format('DD-MM-YYYY')
  console.log(this.filteration);

  
  if (type == 'toDate' && this.filteration['toDate'] !=='Invalid date'){
    this.getAllTasks()

  }
}
  getAllTasks() {
    this.service.getAllTasks(this.filteration).subscribe((res:any)=>{
      this.dataSource =  this.maptasks(res.tasks)
      this.total=res.totalItems
    }, error=>{
      this.toestr.error(error.error.message)

    })

  }
  //pour Mapper sur UserId et obtenir son nom et l'afficher
  maptasks(data:any[]){
    let newTasks=data.map(item=>{
      return {
        ...item,
        user:item.userId.username
      }
    })
    console.log(newTasks);
    return newTasks
    
  }
  addTask(){
    const dialogRef = this.dialog.open(AddTaskComponent, {
width:'650px' ,
disableClose:true
});

    dialogRef.afterClosed().subscribe(result => {
      if(result ){
        this.getAllTasks()
      }
      console.log(result);
    });
  }
  deleteTask(id:any){
    this.service.deleteTask(id).subscribe(res=>{
    this.getAllTasks()


    } , error =>{
      this.toestr.error(error.error.message)
      this.sppiner.hide()
    })
  }
  updateTask(element:any){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width:'650px' ,
      data:element  ,
      disableClose:true

     });
      
          dialogRef.afterClosed().subscribe(result => {
            if(result ){
              this.getAllTasks()
            }
            console.log(result);
          });
  }
  
 //fonction de pagination
  changePage(event:any){
    this.page=event
    this.filteration['page']=event
    this.getAllTasks()

  }
}
