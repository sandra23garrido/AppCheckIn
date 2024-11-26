import { Component } from '@angular/core';
import { AutorizadoGuard } from '../guards/autorizado.guard';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private autorizado: AutorizadoGuard) {}

}
