import { Component, OnInit , Inject } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { NgxSpinner, NgxSpinnerService, Spinner } from 'ngx-spinner';
import { Toast, ToastrService } from 'ngx-toastr';
import { TasksService } from '../../services/tasks.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor
  //pour faire l'injection de donner est mettre les valeurs à modifier
  (@Inject(MAT_DIALOG_DATA) public data:any,
    private fb:FormBuilder ,
    public dialog: MatDialogRef<AddTaskComponent> ,
    public matDialog:MatDialog,
    private service :TasksService ,
    private toaster : ToastrService,
    private spinner : NgxSpinnerService,
    
    ) { 
    }

    users:any = [
      {name:"Moahmed" , id:'63ee50c3af03762098e77447'},
      {name:"Ali" , id:'63ee5170af03762098e7744e'},
      {name:'ahmed' , id:"63efed9e6d26ff130b1e745c"}
   
    ]
  fileName=""
  newTaskForm!:FormGroup;
  //pour appliquer la confirmation si on va fermer le dialog
  formValues:any
  createForm(){
    this.newTaskForm=this.fb.group({
      title :[this.data?.title || '' ,[ Validators.required , Validators.minLength(5)]],
      userId:[this.data?.userId?._id || '' , [Validators.required]],
      image:[this.data?.image || '' ,[Validators.required]],
      description:[this.data?.description || '', [Validators.required]],
      deadline:[/*if not empty */this.data? new Date (this.data?.deadline.split('-').reverse().join('-')).toISOString() /*Else empty*/ : '' , [Validators.required]]
    })
    //log de test pour cofingurer le date 
    console.log(this.data?.deadline.split('-').reverse().join('-'))
    //sockage de data de l'initialisation
    this.formValues = this.newTaskForm.value
  }
  createTask(){

let model=this.prepareFormData()
/* formData.append( 'title', this.newTaskForm.value['title'])
formData.append( 'userId', this.newTaskForm.value['userId'])
formData.append( 'image', this.newTaskForm.value['image'])
formData.append( 'description', this.newTaskForm.value['description'])
formData.append( 'deadline', this.newTaskForm.value['deadline']) */

this.service.createTask(model).subscribe(res=>{
  this.toaster.success("TaskCreated succefuly" , "Success")
  this.dialog.close(true)


} , error=>{
  console.log(error);
  
  this.toaster.error(error.error.message)
})    
  }
  // pour nous permet de importer une image
  selectImage(event:any){
    this.fileName=event.target.value
    this.newTaskForm.get('image')?.setValue(event.target.files[0])
    console.log(event);
    
  }
  // une autre methode créer une formData
  prepareFormData(){
          //specification de date  exple 22-02-2020
    let newDate= moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY')
    let formData = new FormData()
    Object.entries(this.newTaskForm.value).forEach(([key , value] : any)=>{
      if ( key== 'deadline'){
        formData.append(key , newDate)
      } else{
        formData.append(key , value)
      console.log(key , value);
      }
      
      

    })
    return formData 
  }
  ngOnInit(): void {
    
    this.createForm()
  }
  updateTask(){
  let model=this.prepareFormData()
  this.service.updateTask(model , this.data._id).subscribe(res=>{
  this.toaster.success("TaskCreated Updated Succufuly" , "Success")
  this.dialog.close(true)
} , error=>{
  console.log(error);
  
  this.toaster.error(error.error.message)
})    
  }
  close(){
    let hasChanges= false
    Object.keys(this.formValues).forEach((item)=>{
      //comparaison de valeur de champs si diffenent appliquer la fontion close
      if(this.formValues[item] !== this.newTaskForm.value[item]){
        console.log(item , true);
        hasChanges = true    
      }
    })
    if (hasChanges){
      const dialogRef = this.matDialog.open(ConfirmationComponent, {
        width:'550px' ,
       });
        
            dialogRef.afterClosed().subscribe(result => {
              if(result ){
              }
            });
           
    } else{
      this.dialog.close()
    }
  }
}
