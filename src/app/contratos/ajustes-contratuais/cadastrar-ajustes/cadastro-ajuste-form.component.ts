import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Contrato} from '../../contrato';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Percentual} from '../../../percentuais/percentual';
import {Usuario} from '../../../usuarios/usuario';
import {Convencao} from '../../../convencoes-coletivas/convencao';
import {Cargo} from '../../../cargos/cargo';
import {ContratosService} from '../../contratos.service';

@Component({
    selector: 'app-cadastro-ajuste-form-component',
    templateUrl: './cadastro-ajuste-form.component.html',
    styleUrls: ['./cadastrar-ajustes.component.scss']
})
export class CadastroAjusteFormComponent implements OnInit {
    contrato: Contrato;
    @Input() nomeGestorContrato: string;
    @Input() usuarios: Usuario[];
    @Input() convencoesColetivas: Convencao[];
    @Input() cargosCadastrados: Cargo[];
    @Input() percentuaisFerias: Percentual[];
    @Input() percentuaisDecimoTerceiro: Percentual[];
    @Input() codigo: number;
    myForm: FormGroup;
    percentualFerias: number;
    percentualDecimoTerceiro: number;
    percentualIncidencia: number;
    primeiroSubstituto: string;
    segundoSubstituto: string;
    constructor(private fb: FormBuilder, private ref: ChangeDetectorRef, private contrService: ContratosService) {}
    ngOnInit() {
        this.contrService.getContratoCompletoUsuario(this.codigo).subscribe(res => {
                this.contrato = res;
            },
            error => {
                console.log(error);
            },
            () => {
                this.startView();
            }
        );
        this.initForm();
    }
    getFormArrayItems() {
        const control = <FormArray>this.myForm.controls.cargos;
        return control.controls;
    }
    formArrayLength() {
        const control = <FormArray>this.myForm.controls.cargos;
        return control.length;
    }
    initForm() {
        this.myForm = this.fb.group({
            cargos: this.fb.array([]),
            tipoAjuste: new FormControl('', [Validators.required]),
            prorrogacao: new FormControl('Não', [Validators.required]),
            gestor: new FormControl('', [Validators.required]),
            primeiroSubstituto: new FormControl(''),
            segundoSubstituto: new FormControl(''),
            assinatura: new FormControl('', [Validators.required]),
            inicioVigencia: new FormControl('', [Validators.required]),
            fimVigencia: new FormControl('', [Validators.required]),
            assunto: new FormControl(''),
            percentualFerias: new FormControl(''),
            percentualDecimoTerceiro: new FormControl(''),
            percentualIncidencia: new FormControl(''),
            numeroContrato: new FormControl('', [Validators.required]),
            nomeEmpresa: new FormControl('', [Validators.required]),
            cnpj: new FormControl('', [Validators.required]),
            ativo: new FormControl('', [Validators.required]),
            objeto: new FormControl('', [Validators.required])
        });
        this.initCargos();
    }
    adicionaCargo(): void {
        const control = <FormArray>this.myForm.controls.cargos;
        const addCtrl = this.initCargos();
        control.push(addCtrl);
    }
    removeCargo(i: number) {
        const control = <FormArray>this.myForm.controls.cargos;
        control.removeAt(i);
    }
    initCargos() {
        return this.fb.group({
            nome: new FormControl('', [Validators.required]),
            remuneracao: new FormControl('', [Validators.required]),
            descricao: new FormControl(''),
            trienios: new FormControl(''),
            adicionais: new FormControl(''),
            convencao: new FormControl(''),
            dataBase: new FormControl('')
        });
    }
    startView() {
        if (this.contrato) {
            this.myForm.controls.numeroContrato.setValue(this.contrato.numeroDoContrato);
            this.myForm.controls.nomeEmpresa.setValue(this.contrato.nomeDaEmpresa);
            this.myForm.controls.cnpj.setValue(this.contrato.cnpj);
            this.myForm.controls.objeto.setValue(this.contrato.objeto);
            if (this.contrato.seAtivo === 'S' || this.contrato.seAtivo === 'SIM') {
                this.myForm.controls.ativo.setValue('Sim');
            } else {
                this.myForm.controls.ativo.setValue('Não');
            }
            this.myForm.controls.objeto.setValue(this.contrato.objeto);
            this.myForm.controls.gestor.setValue(this.nomeGestorContrato);
            if (this.contrato.percentuais) {
                for (let i = 0; i < this.contrato.percentuais.length; i++) {
                    const percentual: Percentual = this.contrato.percentuais[i];
                    if (percentual.nome.includes('Férias')) {
                        this.percentualFerias = percentual.percentual;
                        this.myForm.controls.percentualFerias.setValue(percentual.percentual);
                    }
                    if (percentual.nome.includes('Décimo terceiro')) {
                        this.percentualDecimoTerceiro = percentual.percentual;
                        this.myForm.controls.percentualDecimoTerceiro.setValue(percentual.percentual);
                    }
                    if (percentual.nome.includes('Incidência')) {
                        this.percentualIncidencia = percentual.percentual;
                        this.myForm.controls.percentualIncidencia.setValue(percentual.percentual);
                    }
                }
            }
            if (this.contrato.historicoGestao.length > 1) {
               if (this.contrato.historicoGestao[1]) {
                    this.primeiroSubstituto = this.contrato.historicoGestao[1].gestor;
                    this.myForm.controls.primeiroSubstituto.setValue(this.primeiroSubstituto);
               }
               if (this.contrato.historicoGestao[2]) {
                  this.segundoSubstituto = this.contrato.historicoGestao[2].gestor;
                   this.myForm.controls.segundoSubstituto.setValue(this.segundoSubstituto);
               }
            }
            this.contrato.funcoes.forEach(funcao => {
                const control = <FormArray>this.myForm.controls.cargos;
                const addCtrl = this.initCargos();
                addCtrl.controls.nome.setValue(funcao.nome);
                addCtrl.controls.nome.disable();
                addCtrl.controls.remuneracao.setValue(funcao.remuneracao);
                addCtrl.controls.descricao.setValue(funcao.descricao);
                addCtrl.controls.trienios.setValue(funcao.trienios);
                addCtrl.controls.adicionais.setValue(funcao.adicionais);
                if (funcao.convencao) {
                    addCtrl.controls.convencao.setValue(funcao.convencao.codigo);
                    addCtrl.controls.dataBase.setValue(funcao.convencao.dataBase);
                }
                control.push(addCtrl);
            });
            this.myForm.updateValueAndValidity();
            this.ref.markForCheck();
            this.ref.detectChanges();
        }
    }
}
