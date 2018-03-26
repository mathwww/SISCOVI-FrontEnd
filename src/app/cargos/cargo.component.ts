import {Component} from '@angular/core';
import {CargoService} from './cargo.service';
import {Cargo} from './cargo';
@Component({
  selector: 'app-cargos',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss']
})
export class CargoComponent {
  cargos: Cargo[] = [];
  constructor(cargoService: CargoService) {
    cargoService.getAllCargos().subscribe(res => {
      this.cargos = res;
    });
  }
}
