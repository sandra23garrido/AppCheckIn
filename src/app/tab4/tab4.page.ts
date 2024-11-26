import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApicrudService } from '../services/apicrud.service';
import { Users } from 'src/interfaces/users';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit{
  NuevoUsuario: Users={
    id:0,
    username:"",
    rut:"",
    email:"",
    password:"",
    carrera:"",
    isactive:true
  }
  registroForm: FormGroup;
  constructor(private menucontroller:MenuController, private alertcontroller:AlertController,
              private router: Router, private apicrud: ApicrudService,
              private authservice: AuthService,
              private toast: ToastController,
              private fbuilder: FormBuilder) {
                this.registroForm = fbuilder.group({ 
                  'username': new FormControl("", [Validators.required, Validators.minLength(6)]),
                  'rut': new FormControl("", [Validators.required, Validators.minLength(8)]),
                  'email': new FormControl("", [Validators.required, Validators.email]),
                  'password': new FormControl("", [Validators.required, Validators.minLength(8)]),
                  'carrera': new FormControl("", [Validators.required, Validators.minLength(8)]),
                }) 
              }

ngOnInit() {
  
  }

  mostrarMenu(){
    this.menucontroller.enable(false);
    this.menucontroller.open('first');
  }

  registro() {
    if (!this.registroForm.valid) {
      this.formularioIncompleto();
      return;
    }
    this.apicrud.getUsers().subscribe((usuarios: Users[]) => {
      if (usuarios.length > 0) {
        const ultimoUsuario = usuarios[usuarios.length - 1];
        const idUltimoUsuario = ultimoUsuario.id + 1;
        this.NuevoUsuario.id = idUltimoUsuario;
      } else {
        this.NuevoUsuario.id = 1; 
      }
  
      this.NuevoUsuario.username = this.registroForm.get('username')?.value;
      this.NuevoUsuario.rut = this.registroForm.get('rut')?.value;
      this.NuevoUsuario.email = this.registroForm.get('email')?.value;
      this.NuevoUsuario.password = this.registroForm.get('password')?.value;
      this.NuevoUsuario.carrera = this.registroForm.get('carrera')?.value;
  
      this.apicrud.postUsers(this.NuevoUsuario).subscribe(() => {
        this.mensaje();
      });
    });
  }
  
  volver() {
    this.router.navigate(['/comienzo'])
    }
  
  async formularioIncompleto(){
    const alerta = await this.alertcontroller.create({ 
      header : 'Registro incompleto',
      message : 'Complete con sus datos',
      buttons : ['OK']
    })
    alerta.present();
  }

  async showToast(msg: any){
    const toast= await this.toast.create({
      message:msg,
      duration: 3000
    })
    toast.present();
  }

  async mensaje(){
    const alert = await this.alertcontroller.create({
      header: 'Registro',
      mode:'ios',
      message: 'Su usuario a sido creado con éxito!',
      buttons: [
        {
          text: 'Ok',
          role: 'confirm',
          handler: () => {
             this.router.navigate(['/inico']);
          },
        },
      ],
    });
    await alert.present();
  }
  
  
}
