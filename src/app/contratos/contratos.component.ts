import {Component, EventEmitter} from '@angular/core';
import {ContratosService} from './contratos.service';
import {Contrato} from './contrato';
import {MaterializeAction} from 'angular2-materialize';
import {CadastroContratoComponent} from "./cadastro-contrato/cadastro.contrato.component";

@Component({
  selector: 'app-contrato',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratosComponent {
  contratos: Contrato[];
  modalActions = new EventEmitter<string | MaterializeAction>();
  private loadComponent = false;
  render = true;
  constructor(contServ: ContratosService) {
    if (contServ.contratos.length === 0) {
      contServ.getContratosDoUsuario().subscribe( res => {
        contServ.contratos = res;
        this.contratos = res;
      });
    } else {
      this.contratos = contServ.contratos;
    }
  }
  loadMyChildComponent() {
    this.loadComponent = true;
  }
  openModal() {
    this.render = true;
    this.modalActions.emit({action: 'modal', params: ['open']});
  }
  closeModal() {
    this.render = false;
    this.modalActions.emit({action: 'modal', params: ['close']});
  }
}
