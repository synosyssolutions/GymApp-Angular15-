import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent {
  public packages = ['Monthly','Quarterly','Yearly'];
  public gender = ["Male","Female"];
  public importantList:string[] = [
    'Toxic Fat Reduction',
    'Energy and Endurance',
    'Building Lean Muscle',
    'Healthier Digestive System',
    'Sugar Craving Body',
    'Fitness'
  ]

  isUpdateActive:boolean = false;
  registerForm!:FormGroup;
  userIdToUpdate!:number;

  constructor(private fb:FormBuilder,private api:ApiService,private toastService:NgToastService,private activatedRoute:ActivatedRoute,private router:Router){}

  ngOnInit(){
    this.registerForm = this.fb.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      weight:[''],
      height:[''],
      bmi:[''],
      bmiResult:[''],
      gender:[''],
      requireTrainer:[''],
      package:[''],
      important:[''],
      haveGymBefore:[''],
      enquiryDate:['']
    })

    this.activatedRoute.params.subscribe(val=>{
      this.userIdToUpdate = val['id'];
      this.api.getRegisteredByUserId(this.userIdToUpdate).subscribe(user=>{
        this.registerForm.patchValue(user);
        this.isUpdateActive = true;
      })
    })
  }

  reset(){
    this.registerForm.reset();
  }

  saveChanges(){
    this.api.postRegistration(this.registerForm.value)
    .subscribe(userDate =>{
      this.toastService.success({detail:"Success",summary:"Enquiry Added",duration:5000});
      this.registerForm.reset();
    })
  }

  update(){
    this.api.updateRegisteredUser(this.registerForm.value,this.userIdToUpdate).subscribe(user =>{
      this.toastService.success({detail:"Success",summary:"Enquiry Updated Successfully",duration:5000});
      this.registerForm.reset();
      this.router.navigate(['/list']);
    })
  }

  calculateBMI(heightValue:number){
    const weight = this.registerForm.value.weight;
    const height = heightValue;
    const bmi = weight/ (height * height);
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue('Under Weight');
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registerForm.controls['bmiResult'].patchValue('Normal');
        break;
      case (bmi >= 25):
        this.registerForm.controls['bmiResult'].patchValue('Over Weight');
        break;    
      default:
        this.registerForm.controls['bmiResult'].patchValue('Obese');
        break;
    }
  }
}
