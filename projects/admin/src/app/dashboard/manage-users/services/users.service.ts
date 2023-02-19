import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
export interface changeStatus{
  id:string,  
  status:string
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }

  getAllUser(filter:any){
    let params = new HttpParams()
Object.entries(filter).forEach(([key , value]:any)=>{
  if (value){
    params = params.append(key , value)
  
  }
})
    return this.http.get(environment.baseApi.replace('tasks','auth')+'/users',{params})
  }
  deleteUser(id:string){
    return  this.http.delete(environment.baseApi.replace('tasks','auth')+'/user/'+id)
  }
  changeStatus(model:changeStatus){
    return  this.http.put(environment.baseApi.replace('tasks','auth')+'/user-status',model)
  }
}
