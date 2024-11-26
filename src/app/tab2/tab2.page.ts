import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApicrudService } from '../services/apicrud.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab2Page {
  selectedOption: string='';
  asignaturaUno:any;
  asignaturaDos:any;
  asignaturaTres:any;
  clasedata: any;
  userdata:any;
  imagen:any;
  descripcion:any;
  qrdata:string='';
  fecha:string='';
  evento:string='';
  rut:any;
  rutsindv:any;
  correo:any;

  constructor(private menucontroller:MenuController, private apicrud: ApicrudService,
              private authservice: AuthService,
              private router:Router) {const date = new Date();
                this.fecha = date.toLocaleString();}
              ngOnInit() {
                this.rut= sessionStorage.getItem('rut');
                this.correo= sessionStorage.getItem('email');
                this.rutsindv =this.rut.substring(0, 8);
                this.cargarDatos();
                this.qrdata='';
              }

  mostrarMenu(){
    this.menucontroller.enable(true);
    this.menucontroller.open('first');
  }
  cerrarsesion(){
    this.router.navigate(['/comienzo'])
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

onSelectChange(event: any) {
  if (event.detail.value=="0"){
    this.evento="0";
    this.apicrud.getClase().subscribe((clasedata) => {
      this.imagen = clasedata[0].imagen;
      this.descripcion = clasedata[0].descripcion;
      console.log('Clases desde API:', clasedata[0]);
    });
  }else if (event.detail.value=="1"){
    this.evento="1";
    this.apicrud.getClase().subscribe((clasedata) => {
      this.imagen = clasedata[1].imagen;
      this.descripcion = clasedata[1].descripcion;
      console.log('Clases desde API:', clasedata[1]);
    });
  }else {
    this.evento="2";
    this.apicrud.getClase().subscribe((clasedata) => {
      this.imagen = clasedata[2].imagen;
      this.descripcion = clasedata[1].descripcion;
      console.log('Clases desde API:', clasedata[2]);
    });
  }
  console.log('Opción seleccionada:', event.detail.value);
}
generarQr(){
  this.qrdata='';
  if (this.evento == "0"){
    this.apicrud.getClase().subscribe((clasedata) => {
      this.qrdata= clasedata[0].nombre +" "+ this.fecha +" "+ clasedata[0].profesor +" "+ this.rutsindv + " " + this.correo;
    });
  }else if (this.evento =="1"){
    this.apicrud.getClase().subscribe((clasedata) => {
      this.qrdata= clasedata[1].nombre + this.fecha + clasedata[1].profesor +" "+ this.rutsindv + " " + this.correo;
    });
  }else {
    this.apicrud.getClase().subscribe((clasedata) => {
      this.qrdata= clasedata[2].nombre + this.fecha + clasedata[2].profesor +" "+ this.rutsindv + " " + this.correo;
    });
  }
}

}