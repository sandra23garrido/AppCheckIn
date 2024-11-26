import { Component } from '@angular/core';

interface Menu{
  icon:string;
  redirecTo: string;
  name:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menu:Menu[]=[
    {
      icon:'home-outline',
      redirecTo:'/inicio',
      name:'Inicio'
    },
    {
      icon:'person-circle-outline',
      redirecTo:'/tabs/tab1',
      name:'Perfil'
    },
    {
      icon:'library-outline',
      redirecTo:'/tabs/tab2',
      name:'Registro de clase'
    },
    {
      icon:'stats-chart-outline',
      redirecTo:'/tabs/tab3',
      name:'Justificativos'
    },


    ]



  constructor() {}
}
