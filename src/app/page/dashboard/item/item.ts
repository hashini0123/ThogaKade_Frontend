import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerModel, ItemModel } from '../../../../model/type';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item implements OnInit{
deleteByIdentifier() {
        this.http.delete("http://localhost:8080/item/delete-by-id/" + this.deleteItemCode).subscribe(data => {
          if (data === true) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.getAll();
          }
        })}
    itemList: Array<ItemModel> = [];
    showAddForm = false;
    itemObj: ItemModel = {
      itemCode: '',
      description: '',
      packSize: '',
      unitPrice: 0.0,
      qtyOnHand: 0.0,
    }
deleteID: any;
    

  constructor(private http:HttpClient,private cdr:ChangeDetectorRef) {

  } 

  ngOnInit(): void {
    this.getAll();
    this.cdr.detectChanges();
  }
  
  getAll() {
    this.http.get<ItemModel[]>("http://localhost:8080/item/get").subscribe(data =>{
      this.itemList = data;
      this.cdr.detectChanges();   
    })
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {

    }
  }

  addItem(): void {

    console.log(this.itemObj);
    this.http.post("http://localhost:8080/item/add", this.itemObj).subscribe(data => {
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

  deleteItemCode(id: string) {
    
        this.http.delete("http://localhost:8080/item/delete-by-id/" + id).subscribe(data => {
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
  
  }
