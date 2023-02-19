import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor( private http : HttpClient) {}
  getUserTasks(userId:string , taskParams:any){
    let params =new HttpParams()
    Object.entries(taskParams).forEach(([key , value ]:any)=>{
      params =params.append(key , value)
    })

    return this.http.get(environment.baseApi+'user-tasks/'+userId, {params})
  }
  complete(model:object)
  {
    return this.http.put(environment.baseApi+'/complete', model
    )

  }
  taskDetail(id:any){
    return this.http.get(environment.baseApi+'/task/'+id)

  }




   }

