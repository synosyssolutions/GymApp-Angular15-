import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  constructor(private activatedRoute:ActivatedRoute,private api:ApiService){}

  public UserId!:number;
  userDetails!:User;

  ngOnInit(){
    this.activatedRoute.params.subscribe(val =>{
      this.UserId = val['id'];
    })

    this.api.getRegisteredByUserId(this.UserId).subscribe(details =>{
      console.log(details);
      this.userDetails = details;
    })
  }
}
