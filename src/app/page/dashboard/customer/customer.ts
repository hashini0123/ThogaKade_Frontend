import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../../../model/type';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit{
    customerList: Array<CustomerModel> = [];
    showAddForm = false;
    customerObj: CustomerModel = {
      custID: '',
      custTitle: '',
      custName: '',
      DOB: {},
      salary: 0.0,
      custAddress: '',
      city: '',
      province: '',
      postalcode: '',
    }
    

  constructor(private http:HttpClient,private cdr:ChangeDetectorRef) {

  } 

  ngOnInit(): void {
    this.getAll();
  }
  
  getAll() {
    this.http.get<CustomerModel[]>("http://localhost:8080/get").subscribe(data =>{
      this.customerList = data;
      this.cdr.detectChanges();   
    })
  }

  addCustomer(): void {

    console.log(this.customerObj);
    this.http.post("http://localhost:8080/add", this.customerObj).subscribe(data => {
      console.log(data);
      if(data === true){
        Swal.fire({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success"
        });
      }
      this.getAll();
    })
  }

  
}

