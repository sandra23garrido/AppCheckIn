import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab2Page {

  constructor(private menucontroller:MenuController,
              private router:Router
  ) {}

  mostrarMenu(){
    this.menucontroller.open('first');
  }
  cerrarsesion(){
    this.router.navigate(['/comienzo'])
  }
}
