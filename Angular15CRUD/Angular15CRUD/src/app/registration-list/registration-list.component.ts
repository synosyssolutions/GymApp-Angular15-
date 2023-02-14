import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent {
  public dataSource!: MatTableDataSource<User>;
  public users!:User[];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  displayedColumns:string[] = ['id','firstName','lastName','email','mobile','bmiResult','gender','package','enquiryDate','action']; 

  constructor(private api:ApiService,private router:Router,private ngConfirmService:NgConfirmService,private toastService:NgToastService){}

  ngOnInit(){
    this.getUsers();
  }

  getUsers(){
    this.api.getRegistrations()
    .subscribe(res=>{
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  edit(Id:number){
    this.router.navigate(['update',Id]);
  }

  delete(Id:number){
    this.ngConfirmService.showConfirm("Are you sure want to delete?",
    () =>{
      this.api.deleteRegisteredUser(Id).subscribe(()=>{
        this.toastService.success({detail:"Success",summary:"Enquiry Deleted",duration:5000});
        this.getUsers();
      })
    },
    () =>{

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
