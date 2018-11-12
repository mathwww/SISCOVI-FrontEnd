
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Contrato} from '../../contratos/contrato';
import {ContratosService} from '../../contratos/contratos.service';
import {FuncionariosService} from '../../funcionarios/funcionarios.service';
import {CargoService} from '../cargo.service';
import {Funcionario} from '../../funcionarios/funcionario';
import {Cargo} from '../cargo';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ListaCargosFuncionarios} from '../cargos-dos-funcionarios/lista.cargos.funcionarios';

@Component({
    selector: 'app-gerenciar-cargos-terceirizados-component',
    templateUrl: './gerenciar-cargos-terceirizados.component.html',
    styleUrls: ['./gerenciar-cargos-terceirizados.component.scss']
})
export class GerenciarCargosTerceirizadosComponent implements OnInit{
    modoOperacao: string;
    contratos: Contrato[];
    codigo: number;
    terceirizados: Funcionario[];
    funcoes: Cargo[];
    gerenciaForm: FormGroup;
    listaCargosFuncionarios: ListaCargosFuncionarios;
    constructor(private contServ: ContratosService, private funcServ: FuncionariosService, private cargosService: CargoService, private ref: ChangeDetectorRef, private fb: FormBuilder) {
        this.contServ.getContratosDoUsuario().subscribe(res => {
            this.contratos = res;
        });
    }

    ngOnInit() {
        this.gerenciaForm = this.fb.group({
            gerenciarTerceirizados: this.fb.array([this.createGerencia()])
        });
    }

    createGerencia(): FormGroup {
        return this.fb.group({
            terceirizado: new FormControl(),
            funcao: new FormControl(),
            dataInicio: new FormControl()
        });
    }

    get gerenciar(): FormArray {
        return this.gerenciaForm.get('gerenciarTerceirizados') as FormArray;
    }

    removerGerenciar() {
        if (this.gerenciar.length > 1) {
            const control = <FormArray>this.gerenciaForm.get('gerenciarTerceirizados');
            control.removeAt(control.length - 1);
        }
    }

    adicionaGerenciar() {
        this.gerenciar.push(this.fb.group({
            terceirizado: new FormControl(),
            funcao: new FormControl(),
            dataInicio: new FormControl()
        }));
    }
    defineCodigoContrato(codigoContrato: number): void {
        this.codigo = codigoContrato;
        if (this.modoOperacao) {
            if (this.modoOperacao === 'ALOCAÇÃO') {
                this.funcServ.getTerceirizadosNaoAlocados().subscribe(res => {
                    this.terceirizados = res;
                    this.ref.markForCheck();
                });
                this.cargosService.getFuncoesContrato(this.codigo).subscribe(res => {
                    this.funcoes = res;
                    this.ref.markForCheck();
                });
            }
            if (this.modoOperacao === 'ALTERAÇÃO') {
                this.cargosService.getCargosFuncionarios(this.codigo).subscribe(res => {
                    this.listaCargosFuncionarios = res;
                    this.ref.markForCheck();
                });
                this.cargosService.getFuncoesContrato(this.codigo).subscribe(res => {
                    this.funcoes = res;
                    this.ref.markForCheck();
                });
            }
        }
    }

    selecionaModo(modoOperacao: string) {
        this.modoOperacao = modoOperacao;
        if (this.codigo) {
            if (this.modoOperacao) {
                if (this.modoOperacao === 'ALOCAÇÃO') {
                    this.funcServ.getTerceirizadosNaoAlocados().subscribe(res => {
                        this.terceirizados = res;
                        this.ref.markForCheck();
                    });
                    this.cargosService.getFuncoesContrato(this.codigo).subscribe(res => {
                        this.funcoes = res;
                        this.ref.markForCheck();
                    });
                }
                if (this.modoOperacao === 'ALTERAÇÃO') {
                    this.cargosService.getCargosFuncionarios(this.codigo).subscribe(res => {
                        this.listaCargosFuncionarios = res;
                        this.ref.markForCheck();
                    });
                    this.cargosService.getFuncoesContrato(this.codigo).subscribe(res => {
                        this.funcoes = res;
                        this.ref.markForCheck();
                    });
                }
            }
        }

    }
}
