import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { changeStatus, UsersService } from '../../services/users.service';
export interface PeriodicElement {
  name: string;
  email: string;
  tasksAssigned: string;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'email' ,'tasksAssigned', 'actions'];
  dataSource:any =[];
  page=1;
  totalItems:any ;
  constructor( private service : UsersService,
    private toaster:ToastrService) { }

  ngOnInit(): void {
    this.getuserData()
  }
  getuserData(){
    const Model={
      page:this.page,
      limit:10,
      name:"",
    }
    this.service.getAllUser(Model).subscribe((res:any)=>{
    this.totalItems = res.totalItems
      this.dataSource=res.users 
    })
  }

changePage(event:any){
  this.page=event ;
  this.getuserData()

}
deleteUser(id:string , index:number){
  if (this.dataSource[index].tasksAssigned > 0){
    this.toaster.error("You can't Delete this user until  finish hiis task ")
  } else {
    this.service.deleteUser(id).subscribe((res:any)=>{
      this.toaster.success('User deleted Succufily');
      this.page=1
      this.getuserData()
    })
  }
 
}
changeUserStatus(status:string , id:string)
{
  const Model:changeStatus={
    id,
    status
                  }
this.service.changeStatus(Model).subscribe((res)=>{
  this.toaster.success('User status updaed Succufily');
  this.getuserData()
})

}

}
