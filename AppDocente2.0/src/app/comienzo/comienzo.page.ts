import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Profesor, Users } from 'src/interfaces/users';
import { ApicrudService } from '../services/apicrud.service';


@Component({
  selector: 'app-comienzo',
  templateUrl: './comienzo.page.html',
  styleUrls: ['./comienzo.page.scss'],
})
export class ComienzoPage implements OnInit {
    usuario: Profesor={
    id:0,
    username:"",
    rut:"",
    email:"",
    password:"",
    direccion:"",
    isactive:true
  };
  bandera=2;
  correo:string="";
  pass:string="";

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  public alertInputs = [
    {
      type: 'textarea',
      placeholder: 'Correo',
    }
  ];
  userdata: any;
  
  loginForm: FormGroup;
  
  constructor(private alertcontroller: AlertController, 
              private router:Router,
              private toast: ToastController,
              private authservice: AuthService, private apicrud: ApicrudService,
              private fbuilder: FormBuilder) {
                this.loginForm = fbuilder.group({ 
                  'username': new FormControl("", [Validators.required, Validators.minLength(6)]),
                  'password': new FormControl("", [Validators.required, Validators.minLength(8)]),
                })
              }
  ngOnInit() {
      }
      
  async redireccion(){
    this.router.navigate(['/tabs/tab4'])
  }
  async login(){
    if (!this.loginForm.valid){
      return;
    }
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authservice.GetUserByUsername(username).subscribe(resp => { 
      this.userdata = resp;
      console.log(this.userdata);
      if (this.userdata.length === 0) {
        this.loginForm.reset();
        this.UsuarioNoExiste();
        return;
      }
      this.apicrud.getUsers().subscribe(
        (usuarios: Users[]) => {
          console.log(usuarios); 
          this.bandera = 2;

          for (let i = 0; i < usuarios.length; i++){
            this.usuario={
            id: this.userdata[i].id,
            username: this.userdata[i].username,
            rut: this.userdata[i].rut,
            email:this.userdata[i].email,
            password: this.userdata[i].password,
            direccion:this.userdata[i].direccion,
            isactive: this.userdata[i].isactive
          }

          if (this.usuario.password == password) {
            this.IniciarSesion(this.usuario);
            this.bandera=1;
            console.log(this.bandera)
            break;
          }
          if (this.usuario.password !== password) {
            this.bandera=0;
            console.log(this.bandera)
          }
          if (!this.usuario.isactive) {
            this.loginForm.reset();
            this.UsuarioInactivo();
            return;
          }
          }})
          if (this.bandera==0){
            this.loginForm.reset();
            this.ErrorUsuario(); 
            return;
          }
        });
  
}


  async IniciarSesion(usuario:any){
    const alert = await this.alertcontroller.create({
      header: 'Ingreso completado',
      mode:'ios',
      message:'Bienvenido nombre '+this.usuario.username,
      buttons: [
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
             this.router.navigate(['/inicio']);
          },
        },
      ],
    });
    this.loginForm.reset;
    sessionStorage.setItem('id', usuario.id);
    sessionStorage.setItem('username', usuario.username);
    sessionStorage.setItem('password', usuario.password);
    sessionStorage.setItem('rut', usuario.rut);
    sessionStorage.setItem('email', usuario.email);
    sessionStorage.setItem('carrera', usuario.carrera);
    sessionStorage.setItem('isactive', usuario.isactive);
    sessionStorage.setItem('ingresado', 'true');
    this.showToast('Sesión Iniciada '+ this.usuario.username);
    this.router.navigate(['/inicio']);
    await alert.present();
  }

  
  async showToast(msg: any){
    const toast= await this.toast.create({
      message:msg,
      duration: 3000
    })
    toast.present();
  }

  
  async UsuarioInactivo(){
    const alerta = await this.alertcontroller.create({ 
      header : 'Usuario inactivo',
      message : 'Contactar a admin@admin.cl',
      buttons : ['OK']
    })
    alerta.present();
  }

  
async ErrorUsuario(){
  const alerta = await this.alertcontroller.create({ 
    header : 'Error..',
    message : 'Revise sus credenciales',
    buttons : ['OK']
  })
  alerta.present();
}

async UsuarioNoExiste(){
  const alerta = await this.alertcontroller.create({ 
    header : 'No existe...',
    message : 'Debe registrarse..',
    buttons : ['OK']
  })
  alerta.present();
}

}
