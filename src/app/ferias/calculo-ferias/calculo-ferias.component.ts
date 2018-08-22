import {Component, EventEmitter} from '@angular/core';
import {ContratosService} from '../../contratos/contratos.service';
import {Contrato} from '../../contratos/contrato';
import {TerceirizadoFeriasMovimentacao} from '../terceirizado-ferias-movimentacao';
import {FeriasService} from '../ferias.service';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FeriasCalcular} from '../ferias-calcular';
import {MaterializeAction} from 'angular2-materialize';

@Component({
    selector: 'app-calculo-ferias-component',
    templateUrl: './calculo-ferias.component.html',
    styleUrls: ['./calculo-ferias.component.scss']
})
export class CalculoFeriasComponent {
    protected contratos: Contrato[];
    protected terceirizados: TerceirizadoFeriasMovimentacao[];
    codigoContrato: number;
    tipoRestituicao: string;
    feriasForm: FormGroup;
    fb: FormBuilder;
    isSelected =  false;
    selected = false;
    feriasCalcular: FeriasCalcular[] = [];
    modalActions = new EventEmitter<string | MaterializeAction>();
    modalActions2 = new EventEmitter<string | MaterializeAction>();
    constructor(private contratoService: ContratosService, private feriasService: FeriasService, fb: FormBuilder) {
        this.fb = fb;
        this.contratoService.getContratosDoUsuario().subscribe(res => {
            this.contratos = res;
        });
    }
    defineCodigoContrato(codigoContrato: number): void {
        this.codigoContrato = codigoContrato;
        if (this.codigoContrato && this.tipoRestituicao) {
            this.feriasService.getFuncionariosFerias(this.codigoContrato, this.tipoRestituicao).subscribe(res => {
                this.terceirizados = res;
                this.formInit();
            });
        }
    }
    defineTipoMovimentacao(tipoMovimentacao: string): void {
        this.tipoRestituicao = tipoMovimentacao;
        if (this.codigoContrato && this.tipoRestituicao) {
            this.feriasService.getFuncionariosFerias(this.codigoContrato, this.tipoRestituicao).subscribe(res => {
                this.terceirizados = res;
                this.formInit();
            });
        }
    }
    formInit(): void {
        this.feriasForm = this.fb.group({
            calcularTerceirizados: this.fb.array([])
        });
        const control = <FormArray>this.feriasForm.controls.calcularTerceirizados;
        this.terceirizados.forEach(item => {
            const addCtrl = this.fb.group({
                codTerceirizadoContrato: new FormControl(item.codigoTerceirizadoContrato, [Validators.required]),
                tipoRestituicao: new FormControl(this.tipoRestituicao, [Validators.required]),
                diasVendidos: new FormControl('', [Validators.required]),
                inicioFerias: new FormControl('', [Validators.required, this.myDateValidator]),
                fimFerias: new FormControl('', [Validators.required, this.myDateValidator]),
                inicioPeriodoAquisitivo: new FormControl(item.inicioPeriodoAquisitivo, [Validators.required]),
                fimPeriodoAquisitivo: new FormControl(item.fimPeriodoAquisitivo, [Validators.required]),
                valorMovimentado: new FormControl('', [Validators.required]),
                proporcional: new FormControl('N', [Validators.required]),
                selected: new FormControl(this.isSelected)
            });
            control.push(addCtrl);
        });
    }
    /* confirma() {
        console.log(this.feriasForm);
        console.log(this.feriasForm.get('calcularTerceirizados').get('0').get('valorMovimentado').dirty);
        console.log(this.feriasForm.get('calcularTerceirizados').get('0').get('valorMovimentado').pristine);
    } */
    verificaDadosFormulario() {
        let aux = 0;
        for (let i = 0; i < this.terceirizados.length; i++) {
            if (this.feriasForm.get('calcularTerceirizados').get('' + i).get('selected').value) {
                aux++;
               if (this.feriasForm.get('calcularTerceirizados').get('' + i).status === 'VALID') {
                   const objeto = new FeriasCalcular(this.feriasForm.get('calcularTerceirizados').get('' + i).get('codTerceirizadoContrato').value,
                       this.feriasForm.get('calcularTerceirizados').get('' + i).get('tipoRestituicao').value,
                       this.feriasForm.get('calcularTerceirizados').get('' + i).get('diasVendidos').value,
                       this.feriasForm.get('calcularTerceirizados').get('' + i).get('inicioFerias').value,
                       this.feriasForm.get('calcularTerceirizados').get('' + i).get('fimFerias').value,
                       this.feriasForm.get('calcularTerceirizados').get('' + i).get('inicioPeriodoAquisitivo').value,
                       this.feriasForm.get('calcularTerceirizados').get('' + i).get('fimPeriodoAquisitivo').value,
                       this.feriasForm.get('calcularTerceirizados').get('' + i).get('valorMovimentado').value,
                       this.feriasForm.get('calcularTerceirizados').get('' + i).get('proporcional').value);
                   this.feriasCalcular.push(objeto);
               }else {
                   this.feriasForm.get('calcularTerceirizados').get('' + i).get('inicioFerias').markAsTouched();
                   this.feriasForm.get('calcularTerceirizados').get('' + i).get('inicioFerias').markAsDirty();
                   this.feriasForm.get('calcularTerceirizados').get('' + i).get('fimFerias').markAsTouched();
                   this.feriasForm.get('calcularTerceirizados').get('' + i).get('fimFerias').markAsDirty();
                   this.feriasForm.get('calcularTerceirizados').get('' + i).get('diasVendidos').markAsTouched();
                   this.feriasForm.get('calcularTerceirizados').get('' + i).get('diasVendidos').markAsDirty();
                   this.feriasForm.get('calcularTerceirizados').get('' + i).get('valorMovimentado').markAsTouched();
                   this.feriasForm.get('calcularTerceirizados').get('' + i).get('valorMovimentado').markAsDirty();
                   this.openModal2();
               }
            }
        }
        if (aux === 0) {
            this.openModal1();
            /* for (let i = 0; i < this.terceirizados.length; i++) {
                this.feriasForm.get('calcularTerceirizados').get('' + i).get('inicioFerias').markAsTouched();
                this.feriasForm.get('calcularTerceirizados').get('' + i).get('inicioFerias').markAsDirty();
                this.feriasForm.get('calcularTerceirizados').get('' + i).get('fimFerias').markAsTouched();
                this.feriasForm.get('calcularTerceirizados').get('' + i).get('fimFerias').markAsDirty();
                this.feriasForm.get('calcularTerceirizados').get('' + i).get('diasVendidos').markAsTouched();
                this.feriasForm.get('calcularTerceirizados').get('' + i).get('diasVendidos').markAsDirty();
                this.feriasForm.get('calcularTerceirizados').get('' + i).get('valorMovimentado').markAsTouched();
                this.feriasForm.get('calcularTerceirizados').get('' + i).get('valorMovimentado').markAsDirty();
            } */
        }
        if (this.feriasCalcular && aux) {
           console.log(this.feriasCalcular);
        }
    }
    public myDateValidator(control: AbstractControl): {[key: string]: any} {
        const val = control.value;
        const mensagem = [];
        const otherRegex = new RegExp(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/);
        if (val.length > 0 ) {
            const dia = Number(val.split('/')[0]);
            const mes = Number(val.split('/')[1]);
            const ano = Number(val.split('/')[2]);
            if (dia <= 0 || dia > 31 ) {
                mensagem.push('O dia da data é inválido.');
            }
            if (mes <= 0 || mes > 12) {
                mensagem.push('O Mês digitado é inválido');
            }
            if (ano < 2000 || ano > (new Date().getFullYear() + 5)) {
                mensagem.push('O Ano digitado é inválido');
            }
            if (val.length === 10 ) {
                if (!otherRegex.test(val)) {
                    mensagem.push('A data digitada é inválida');
                }
            }
        }
        return (mensagem.length > 0) ? {'mensagem': [mensagem]} : null;
    }
    closeModal1() {
        this.modalActions.emit({action: 'modal', params: ['close']});
    }
    openModal1() {
        this.modalActions.emit({action: 'modal', params: ['open']});
    }
    openModal2() {
        this.modalActions2.emit({action: 'modal', params: ['open']});
    }
    closeModal2() {
        this.modalActions2.emit({action: 'modal', params: ['close']});
    }
}
