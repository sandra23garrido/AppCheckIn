import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
a:any;
b:any;
c:any;
movimiento:any;
imagen:any;
    
  constructor(private menucontroller:MenuController,
              private router:Router
  ) { }

  ngOnInit() {
    this.a='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfy8wRk0ODOm0Tz9cKIHhQfDpCnhcmIIz5TA&s';
    this.b='https://www.duoc.cl/wp-content/uploads/2020/07/alumnos-duoc-960x600.jpg';
    this.c='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3SSmnjekL-o9DTtZMtexnSKgqIhtH-8byXA&s';
    this.movimiento="a";
    this.imagen=this.a;
  }
  carrusel(){
    if (this.movimiento=="a"){
      this.movimiento="b";
      this.imagen=this.b;
      console.log(this.movimiento);
    }else if(this.movimiento=="b"){
      this.movimiento="c";
      this.imagen=this.c;
      console.log(this.movimiento);
    }else{
      this.movimiento="a";
      this.imagen=this.a;
      console.log(this.movimiento);
    }
  }
  mostrarMenu(){
    this.menucontroller.enable(true);
    this.menucontroller.open('first');
  }
  cerrarsesion(){
    this.router.navigate(['/comienzo'])
  }
  
}


