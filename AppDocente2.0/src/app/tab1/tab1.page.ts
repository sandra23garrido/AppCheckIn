import { Component, OnInit} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApicrudService } from '../services/apicrud.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  nombre:any;
  rut: any;
  email: any;
  password: any;
  direccion: any;
  isactive: any;
  userForm: FormGroup;
  nuevo:any;
  nuevoEmail: string = '';
  nuevaPass: string = '';
  nuevadireccion: string='';
  constructor(private menucontroller:MenuController,
              private activated: ActivatedRoute, private router: Router, 
              private alert: AlertController, private toastController: ToastController,
              private apicrud: ApicrudService,
              private authservice: AuthService,
              private fbuilder: FormBuilder
              ){ this.userForm = fbuilder.group({ 
                'username': new FormControl("", [Validators.required, Validators.minLength(6)]),
                'rut': new FormControl("", [Validators.required, Validators.minLength(8)]),
                'email': new FormControl("", [Validators.required, Validators.email]),
                'password': new FormControl("", [Validators.required, Validators.minLength(8)]),
                'direccion': new FormControl("", [Validators.required, Validators.minLength(4)]),
              }) 
              }
              ngOnInit() {
                  this.nombre= sessionStorage.getItem('username');
                  this.rut= sessionStorage.getItem('rut'),
                  this.email= sessionStorage.getItem('email'),
                  this.password= sessionStorage.getItem('password'),
                  this.direccion= sessionStorage.getItem('direccion')
                  this.isactive= sessionStorage.getItem('isactive')
                  this.userForm.patchValue({
                    email: this.email,
                    password: this.password
                  });
                  this.nuevoEmail = this.email;
                  this.nuevaPass = this.password;
              }

  mostrarMenu(){
    this.menucontroller.enable(true);
    this.menucontroller.open('first');
  }
  cerrarsesion(){
    this.router.navigate(['/comienzo'])
  }
  async mostrarAlertaCorreo() {
    const alert = await this.alert.create({
      header: 'Modificar correo',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo electrónico',
          value: this.userForm.get('email')?.value,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.userForm.get('email')?.setValue(this.email);
            console.log('Alerta cancelada');
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: (data: any) => {
            this.nuevo = data.email;
            this.nuevoEmail = data.email;
            this.userForm.get('email')?.setValue(this.nuevo);
            if (this.userForm.get('email')?.valid) {
              console.log('Nuevo correo: ', data.email); 
              this.userForm.get('email')?.setValue(data.email);
              console.log(data.email)
              this.email = this.nuevoEmail;
              return true;
            } else {
              console.log('El correo no es válido');
              this.showInvalidEmailToast();
              return false;
            }
          },
        },
      ],
    });
    await alert.present();
  }
async mostrarAlertaPassword() {
  const alert = await this.alert.create({
    header: 'Modificar Contraseña',
    inputs: [
      {
        name: 'password',
        type: 'password',
        placeholder: 'Contraseña',
        value: this.userForm.get('password')?.value,
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Alerta cancelada');
        },
      },
      {
        text: 'Confirmar',
        handler: (data) => {
          this.nuevo = data.password;
          this.nuevaPass = data.password;
          this.userForm.get('password')?.setValue(this.nuevo);
          if (this.userForm.get('password')?.valid) {
            console.log('Nueva contraseña: ', data.password);
            this.userForm.get('password')?.setValue(data.password);
            this.password= this.nuevaPass;
            return true;
          } else {
            console.log('La contraseña no es válida');
              this.showInvalidPassToast();
              return false;
          }
        },
      },
    ],
  });
  await alert.present();
}
async mostrarAlertaDireccion() {
  const alert = await this.alert.create({
    header: 'Modificar Contraseña',
    inputs: [
      {
        name: 'direccion',
        type: 'text',
        placeholder: 'direccion',
        value: this.userForm.get('direccion')?.value,
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Alerta cancelada');
        },
      },
      {
        text: 'Confirmar',
        handler: (data) => {
          this.nuevo = data.direccion;
          this.nuevaPass = data.direccion;
          this.userForm.get('direccion')?.setValue(this.nuevo);
          if (this.userForm.get('direccion')?.valid) {
            console.log('Nueva contraseña: ', data.direccion);
            this.userForm.get('direccion')?.setValue(data.direccion);
            this.direccion= this.nuevadireccion;
            return true;
          } else {
            console.log('La direccion no es válida');
              this.showInvalidDireccionToast();
              return false;
          }
        },
      },
    ],
  });
  await alert.present();
}
async showInvalidDireccionToast() {
  const toast = await this.toastController.create({
    message: 'La direccion ingresada no es válida.',
    duration: 2000,  
    position: 'bottom',  
    color: 'danger',  
  });

  await toast.present();  
}

async showInvalidEmailToast() {
  const toast = await this.toastController.create({
    message: 'El correo ingresado no es válido.',
    duration: 2000,  
    position: 'bottom',  
    color: 'danger',  
  });

  await toast.present();  
}
async showInvalidPassToast() {
  const toast = await this.toastController.create({
    message: 'La contraseña ingresada no es válida.',
    duration: 2000,  
    position: 'bottom',  
    color: 'danger',  
  });

  await toast.present();  
}

updateUser() {
  sessionStorage.setItem('email', this.email);
  sessionStorage.setItem('password', this.password);
  const userId = sessionStorage.getItem('id');
  const updatedUser = {
    id: userId, 
    nombre: this.nombre,
    rut: this.rut,
    email: this.email,
    password: this.password,
    direccion: this.direccion,
    isactive: this.isactive
  };
  this.apicrud.putUsers(updatedUser).subscribe(
    response => {
      console.log('Usuario actualizado correctamente', response);
      this.showSuccessToast();  
    },
    error => {
      console.log('Error al actualizar usuario', error);
      this.showErrorToast();  
    }
  );
}

async showSuccessToast() {
  const toast = await this.toastController.create({
    message: 'Correo actualizado con éxito.',
    duration: 2000, 
    position: 'bottom',
    color: 'success',  
  });

  await toast.present();  
}

async showErrorToast() {
  const toast = await this.toastController.create({
    message: 'Hubo un problema al actualizar el correo.',
    duration: 2000,
    position: 'bottom',
    color: 'danger',
  });

  await toast.present();
}

}