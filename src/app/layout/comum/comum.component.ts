import {Component, Renderer2} from '@angular/core';
import { ConfigService } from '../../_shared/config.service';
// import { AreaService } from '../../areas/area.service';
// import { StatusService } from '../../tramites/status.service';

@Component({
  selector: 'app-comum',
  templateUrl: './comum.component.html',
  styleUrls: ['./comum.component.scss']
})
export class ComumComponent {
  title: string = this.config.title;
  subtitle: string = this.config.subtitle;

  constructor(// private areaService: AreaService,
              // private statusService: StatusService,
              public config: ConfigService) {
    localStorage.removeItem('is_menu');
  }
}
