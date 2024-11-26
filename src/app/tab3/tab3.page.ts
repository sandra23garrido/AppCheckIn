import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApicrudService } from '../services/apicrud.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Justificativo } from 'src/interfaces/users';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  selectedOption: string='';
  asignaturaUno:any;
  asignaturaDos:any;
  asignaturaTres:any;
  clasedata: any;
  imagen:any;
  descripcion:any;
  fecha:string='';
  profesor:any;
  rut:any;
  nombre:any;
  texto: string = '';
  datajustificada:any;
  rango:any;
  NuevoJustificativo: Justificativo={
    id:0,
    rut:"",
    nombre:"",
    comentario:"",
    fecha:"",
    profesor:"",
  }
  constructor(private menucontroller:MenuController, private apicrud: ApicrudService, private alertcontroller:AlertController,
              private alert: AlertController, private toastController: ToastController,
              private router:Router, ) {const date = new Date();
                this.fecha = date.toLocaleString();
              }
              ngOnInit() {
                this.apicrud.getClase().subscribe((datajustificada) =>{
                  this.rango= datajustificada.length;
                })
                this.rut= sessionStorage.getItem('rut');
                this.cargarDatos();
              }
              
    cargarDatos() {
    this.imagen="https://via.placeholder.com/500x500.png?text=+";
    this.apicrud.getClase().subscribe((clasedata) => {
      console.log('Clases desde API:', clasedata);

      this.asignaturaUno = clasedata[0].nombre;
      this.asignaturaDos =  clasedata[1].nombre;
      this.asignaturaTres = clasedata[2].nombre;
    });
}



  mostrarMenu(){ 
    this.menucontroller.enable(true);
    this.menucontroller.open('first'); 
  }
  cerrarsesion(){
    this.router.navigate(['/comienzo'])
  }

  onSelectChange(event: any) {
    if (event.detail.value=="0"){
      this.apicrud.getClase().subscribe((clasedata) => {
        this.nombre= clasedata[0].nombre;
        this.profesor= clasedata[0].profesor;
        this.imagen = clasedata[0].imagen;
        this.descripcion = clasedata[0].descripcion;
        console.log('Clases desde API:', clasedata[0]);
      });
    }else if (event.detail.value=="1"){
      this.apicrud.getClase().subscribe((clasedata) => {
        this.nombre= clasedata[1].nombre;
        this.profesor= clasedata[1].profesor;
        this.imagen = clasedata[1].imagen;
        this.descripcion = clasedata[1].descripcion;
        console.log('Clases desde API:', clasedata[1]);
      });
    }else {
      this.apicrud.getClase().subscribe((clasedata) => {
        this.nombre= clasedata[2].nombre;
        this.profesor= clasedata[2].profesor;
        this.imagen = clasedata[2].imagen;
        this.descripcion = clasedata[1].descripcion;
        console.log('Clases desde API:', clasedata[2]);
      });
    }
    console.log('Opción seleccionada:', event.detail.value);
  }
  Justificado(){
      this.NuevoJustificativo.id= this.rango+1, 
      this.NuevoJustificativo.rut= this.rut,
      this.NuevoJustificativo.nombre= this.nombre,
      this.NuevoJustificativo.comentario= this.texto,
      this.NuevoJustificativo.fecha= this.fecha,
      this.apicrud.postJustificativo(this.NuevoJustificativo).subscribe(() => {
      this.mensaje();
    });
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

