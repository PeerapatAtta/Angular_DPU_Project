import { NgOptimizedImage } from '@angular/common'
import { Component, ElementRef, ViewChild, inject } from '@angular/core'
import { 
  ReactiveFormsModule, 
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms'

import { Meta } from '@angular/platform-browser'


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private meta = inject(Meta)

  // FormGroup
  loginForm!: FormGroup
  // สร้างตัวแปรไว้เช็คว่า submit form หรือยัง
  submitted = false
  // สร้างตัวแปรไว้ซ่อน/แสดง password
  hide = true

  // ตัวแปรสำหรับผูกกับฟอร์ม
  userLogin = {
    "email": "",
    "password": ""
  }

  // ใช้ ViewChild ในการเข้าถึง Element ใน Template
  @ViewChild('emailInput') emailInput!: ElementRef

  // Constructor
  constructor(
    private formBuilder: FormBuilder
  ){
  }

  // ngOnInit
  ngOnInit(){
    this.meta.addTag(
      {
        name: 'title',
        content: 'เข้าสู่ระบบ | Stock Management'
      },
    )
    this.meta.addTag(
      {
        name: 'description',
        content: 'Login Stock Management is a web application that allows users to manage their stock inventory.'
      },
    )
    this.meta.addTag(
      {
        name: 'keywords',
        content: 'Login , stock, management, inventory, web application, stock management, inventory management, stock inventory, stock management web application, inventory management web application, stock inventory web application, stock management inventory, stock management inventory web application, stock management inventory management'
      },
    )
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  submitLogin(){

  }

  resetForm(){
    this.submitted = false
    this.loginForm.reset()
    // ให้ focus ที่ input email
    this.emailInput.nativeElement.focus()
  }

}

