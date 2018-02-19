import {Component, EventEmitter, Renderer2} from '@angular/core';
import { ConfigService } from '../../_shared/config.service';
// import { AreaService } from '../../areas/area.service';
// import { StatusService } from '../../tramites/status.service';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-comum',
  templateUrl: './comum.component.html',
  styleUrls: ['./comum.component.scss']
})
export class ComumComponent {
  title: string = this.config.title;
  subtitle: string = this.config.subtitle;
  // theParams = 'hide';
  constructor(// private areaService: AreaService,
              // private statusService: StatusService,
              public config: ConfigService) {
    localStorage.removeItem('is_menu');
  }
  /* sideNavActions = new EventEmitter<string|MaterializeAction>();
  toggle () {
    if (this.theParams === 'show') {
      this.theParams = 'hide';
      this.sideNavActions.emit({action: 'sideNav', params: ['hide']});
    }else {
      this.theParams = 'show';
      this.sideNavActions.emit({action: 'sideNav', params: ['show']});
    }
    console.log('A função foi chamada e o valor de toggle é: ' + this.theParams);
  } */
}
