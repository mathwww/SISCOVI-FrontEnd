import {ChangeDetectorRef, Component, EventEmitter} from '@angular/core';
import {Contrato} from '../contratos/contrato';
import {ContratosService} from '../contratos/contratos.service';
import {FuncionariosService} from './funcionarios.service';
import {Funcionario} from './funcionario';
import {PagerService} from '../_shared/pager.service';
import {MaterializeAction} from 'angular2-materialize';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
  index2: number;
  gestor: string;
  pager: any;
  pagedItems: Funcionario[];
  indice = 1;
  modalActions = new EventEmitter<string | MaterializeAction>();
  terceirizadoForm: FormGroup;
  constructor(contrSer: ContratosService, funcServ: FuncionariosService, private pagerService: PagerService, private fb: FormBuilder, private ref: ChangeDetectorRef) {
    this.contrSer = contrSer;
    this.funcServ = funcServ;
    this.contrSer.getContratosDoUsuario().subscribe(res => {
      this.contratos = res;
    });
      this.terceirizadoForm = this.fb.group({
          nomeTerceirizado: new FormControl(),
          cpf: new FormControl(),
          ativo: new FormControl('S', [Validators.required])
      });
      this.terceirizadoForm.get('nomeTerceirizado').setValidators(Validators.required);
      this.terceirizadoForm.get('cpf').setValidators(Validators.required);
  }

  onChange(value: string) {
    this.index2 = Number(value.split(',')[1]) - 1 ;
    this.valid = false;
    this.funcServ.getFuncionariosDeUmContrato(Number(value.split(',')[1])).subscribe(res => {
      this.funcionarios = res.funcionarios;
      this.gestor = res.gestor;
      this.indice = Number(value.split(',')[0]);
      this.valid = true;
      this.setPage(1);
    });
  }

  setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.funcionarios.length, page);
        // get current page of items
        this.pagedItems = this.funcionarios.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

  openModal() {
      this.modalActions.emit({action: 'modal', params: ['open']});
    }

  closeModal() {
        this.modalActions.emit({action: 'modal', params: ['close']});
        this.terceirizadoForm.reset();
        this.ref.markForCheck();
    }

  cadastrarTerceirzado() {
        if (this.terceirizadoForm.valid) {
            const funcionario = new Funcionario();
            funcionario.nome = this.terceirizadoForm.get('nomeTerceirizado').value;
            funcionario.cpf = this.terceirizadoForm.get('cpf').value;
            funcionario.ativo = this.terceirizadoForm.get('ativo').value;
            this.funcServ.cadastraTerceirizado(funcionario).subscribe(res => {

            });
        }
    }

}
