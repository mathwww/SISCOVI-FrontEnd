import { Component } from '@angular/core';
import { ConfigService } from '../_shared/config.service';
import { Http } from '@angular/http';
import { Rubrica } from './rubrica';
import {RubricasService} from './rubricas.service';

@Component({
  selector: 'app-rubricas',
  templateUrl: 'rubricas.component.html',
  styleUrls: ['rubricas.component.scss']
})
export class RubricasComponent {
  rubricas: Rubrica[];
  constructor(config: ConfigService, http: Http, rubricaService: RubricasService) {
    rubricaService.getAllrubricas().subscribe(res => {
        this.rubricas = res;
      });
  }
}
