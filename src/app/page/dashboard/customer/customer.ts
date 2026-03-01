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
      DOB: '',
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
    this.http.get<CustomerModel[]>("http://localhost:8080/customer/get").subscribe(data =>{
      this.customerList = data;
      this.cdr.detectChanges();   
    })
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {

    }
  }

  addCustomer(): void {

    console.log(this.customerObj);
    this.http.post("http://localhost:8080/customer/add", this.customerObj).subscribe(data => {
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

  deleteCustomer(id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.http.delete("http://localhost:8080/customer/delete-by-id/" + id).subscribe(data => {
          if (data === true) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.getAll();
          }
        })


      }
    });
  }

  
}