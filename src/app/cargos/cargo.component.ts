import {Component, EventEmitter} from '@angular/core';
import {CargoService} from './cargo.service';
import {Cargo} from './cargo';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss']
})
export class CargoComponent {
  cargos: Cargo[] = [];
  modalActions = new EventEmitter<string|MaterializeAction>();
  render = false;
  cargoService: CargoService;
  constructor(cargoService: CargoService) {
      this.cargoService = cargoService;
    cargoService.getAllCargos().subscribe(res => {
      this.cargos = res;
    });
  }
  openModal() {
      this.render = true;
      this.modalActions.emit({action: 'modal', params: ['open']});
  }
  closeModal() {
      this.render = false;
      this.cargoService.enabled = false;
      this.modalActions.emit({action: 'modal', params: ['close']});
  }
}
