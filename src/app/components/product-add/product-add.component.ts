import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  
  productAddForm: FormGroup;

  constructor(private formBuilder:FormBuilder,
    private productService:ProductService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.productAddForm = this.formBuilder.group({
      productName: ["",Validators.required],
      unitPrice: ["",Validators.required],
      unitsInStock: ["",Validators.required],
      categoryId: ["",Validators.required]
    })
  }

  createProductAddForm(){

  }

  add(){
    if(this.productAddForm.valid){
      let productModel= Object.assign({},this.productAddForm.value) 
      this.productService.add(productModel).subscribe(response =>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError => {

       if(responseError.error.ValidationErrors.length>0){
         console.log(responseError.error.ValidationErrors.length)
         for (let i = 0; i < responseError.error.ValidationErrors; i++) {
        this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası")}
           
         }
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
}
