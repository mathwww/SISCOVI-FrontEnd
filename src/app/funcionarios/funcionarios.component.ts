import {Component} from '@angular/core';
import {Contrato} from '../contratos/contrato';
import {ContratosService} from '../contratos/contratos.service';
import {FuncionariosService} from './funcionarios.service';
import {Funcionario} from './funcionario';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.components.scss']
})
export class FuncionariosComponent {
  contratos: Contrato[] = [];
  funcionarios: Funcionario[];
  funcServ: FuncionariosService;
  contrSer: ContratosService;
  valid = false;
  index: number;
  gestor: string;
  constructor(contrSer: ContratosService, funcServ: FuncionariosService) {
    this.contrSer = contrSer;
    this.funcServ = funcServ;
    this.contrSer.getContratosDoUsuario().subscribe(res => {
      this.contratos = res;
    });
  }
  onChange(value: number) {
    this.index = value - 1;
    this.funcServ.getFuncionariosDeUmContrato(value).subscribe(res => {
      this.funcionarios = res.funcionarios;
      this.gestor = res.gestor;
      this.valid = true;
    });
  }
}
