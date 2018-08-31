import {Component, EventEmitter, OnInit} from '@angular/core';
import {ContratosService} from '../../contratos/contratos.service';
import {Contrato} from '../../contratos/contrato';
import {TerceirizadoFeriasMovimentacao} from '../terceirizado-ferias-movimentacao';
import {FeriasService} from '../ferias.service';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FeriasCalcular} from '../ferias-calcular';
import {MaterializeAction} from 'angular2-materialize';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-calculo-ferias-component',
    templateUrl: './calculo-ferias.component.html',
    styleUrls: ['./calculo-ferias.component.scss']
})
export class CalculoFeriasComponent  {
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
    modalActions3 = new EventEmitter<string | MaterializeAction>();
    vmsm: boolean;

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
                inicioPeriodoAquisitivo: new FormControl(item.inicioPeriodoAquisitivo, [Validators.required]),
                fimPeriodoAquisitivo: new FormControl(item.fimPeriodoAquisitivo, [Validators.required]),
                valorMovimentado: new FormControl('', [Validators.required], this.valorMovimentadoValidator.bind(this)),
                proporcional: new FormControl('N', [Validators.required]),
                selected: new FormControl(this.isSelected),
                existeCalculoAnterior: new FormControl(item.existeCalculoAnterior),
                tipoRestituicao: new FormControl(this.tipoRestituicao, [Validators.required]),
                diasVendidos: new FormControl(0, [Validators.required, this.diasVendidosValidator]),
                inicioFerias: new FormControl('', [Validators.required, this.myDateValidator, this.inicioUsufrutoValidator, Validators.minLength(10), Validators.maxLength(10)]),
                fimFerias: new FormControl('', [Validators.required, this.myDateValidator, this.fimUsufrutoValidator, Validators.minLength(10), Validators.maxLength(10)]),
                valoMáximoASerMovimentado: new FormControl(),
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
                   const index = this.feriasCalcular.findIndex(x => x.getCodTerceirizadoContrato() === objeto.getCodTerceirizadoContrato());
                   objeto.setNomeTerceirizado(this.terceirizados[i].nomeTerceirizado);
                   if (index) {
                       this.feriasCalcular.splice(index, 1);
                       this.feriasCalcular.push(objeto);
                   } else {
                       this.feriasCalcular.push(objeto);
                   }
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
        if ((this.feriasCalcular.length > 0) && aux) {
           console.log(this.feriasCalcular);
           this.openModal3();
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
    public diasVendidosValidator(control: AbstractControl): {[key: string]: any} | null {
        const mensagem = [];
        if (control.value < 0) {
           mensagem.push('O valor de dias vendidos não pode ser menor que zero !');
        }
        return (mensagem.length > 0) ? {'mensagem': [mensagem]} : null;
    }
    public valorMovimentadoValidator(control: AbstractControl) {
        const mensagem: string[] = [];
        if (control.value <= 0) {
            mensagem.push('O valor a ser movimentado deve ser maior que zero !');
        }
        if (control.parent) {
            let dia = 0;
            let mes = 0;
            let ano = 0;
            dia = Number(control.parent.get('fimFerias').value.split('/')[0]);
            mes = Number(control.parent.get('fimFerias').value.split('/')[1]) - 1;
            ano = Number(control.parent.get('fimFerias').value.split('/')[2]);
            const fimUsufruto: Date = new Date(ano, mes, dia);
            dia = Number(control.parent.get('inicioFerias').value.split('/')[0]);
            mes = Number(control.parent.get('inicioFerias').value.split('/')[1]) - 1;
            ano = Number(control.parent.get('inicioFerias').value.split('/')[2]);
            const inicioUsufruto: Date = new Date(ano, mes, dia);
           if (fimUsufruto && inicioUsufruto) {
               if (control.parent.get('fimFerias').valid && control.parent.get('inicioFerias').valid) {
                   const feriasTemp = new FeriasCalcular(control.parent.get('codTerceirizadoContrato').value,
                       control.parent.get('tipoRestituicao').value,
                       control.parent.get('diasVendidos').value,
                       control.parent.get('inicioFerias').value,
                       control.parent.get('fimFerias').value,
                       control.parent.get('inicioPeriodoAquisitivo').value,
                       control.parent.get('fimPeriodoAquisitivo').value,
                       0,
                       control.parent.get('proporcional').value);
                   const index = this.terceirizados.findIndex( x => x.codigoTerceirizadoContrato === Number(control.parent.get('codTerceirizadoContrato').value) );
                       this.feriasService.getValoresFeriasTerceirizado(feriasTemp).subscribe(res => {
                           if (!res.error) {
                               this.terceirizados.forEach(terceirizado => {
                                   if (terceirizado.codigoTerceirizadoContrato === control.parent.get('codTerceirizadoContrato').value) {
                                       terceirizado.valorRestituicaoFerias = res;
                                       control.parent.get('valoMáximoASerMovimentado').setValue(terceirizado.valorRestituicaoFerias.valorFerias + terceirizado.valorRestituicaoFerias.valorTercoConstitucional);
                                       this.vmsm = true;
                                   }
                               });
                           } else {
                               const error: string = res.error;
                               mensagem.push(error);
                           }
                       });
               }
           }
            if (control.value && this.vmsm) {
                if (control.value > (control.parent.get('valoMáximoASerMovimentado').value)) {
                    mensagem.push('O valor a ser movimentado não pode ser maior que o valor máximo a ser movimentado !');
                }
            }
        }
            // return (mensagem.length > 0) ? {'mensagem': [mensagem]} : null;
        return Observable.of((mensagem.length > 0 ) ? mensagem : null).pipe(
            map(result => (mensagem.length > 0) ? {'mensagem': mensagem} : null)
        );
    }
    public fimUsufrutoValidator(control: AbstractControl): {[key: string]: any} | null {
        const mensagem = [];
        if (control.parent) {
            if (control.parent.get('inicioFerias').valid && (control.value.length === 10)) {
                let dia = 0;
                let mes = 0;
                let ano = 0;
                dia = Number(control.value.split('/')[0]);
                mes = Number(control.value.split('/')[1]) - 1;
                ano = Number(control.value.split('/')[2]);
                const fimUsufruto: Date = new Date(ano, mes, dia);
                dia = Number(control.parent.get('inicioFerias').value.split('/')[0]);
                mes = Number(control.parent.get('inicioFerias').value.split('/')[1]) - 1;
                ano = Number(control.parent.get('inicioFerias').value.split('/')[2]);
                const inicioUsufruto: Date = new Date(ano, mes, dia);
                if (fimUsufruto < inicioUsufruto) {
                    mensagem.push('A Data Fim do Usufruto deve ser maior que a Data de Início do Usufruto !');
                }
                const diff = Math.abs(fimUsufruto.getTime() - inicioUsufruto.getTime());
                const diffDay = Math.round(diff / (1000 * 3600 * 24));
                if (diffDay > 30) {
                    mensagem.push('O período de férias não pode ser maior que 30 dias !');
                }
            }
        }
        return (mensagem.length > 0) ? {'mensagem': [mensagem]} : null;
    }
    public inicioUsufrutoValidator(control: AbstractControl): {[key: string]: any} | null {
        const mensagem = [];
        if (control.parent) {
            let dia = 0;
            let mes = 0;
            let ano = 0;
            dia = Number(control.value.split('/')[0]);
            mes = Number(control.value.split('/')[1]) - 1;
            ano = Number(control.value.split('/')[2]);
            const inicioUsufruto: Date = new Date(ano, mes, dia);
            let val: Number[] = control.parent.get('fimPeriodoAquisitivo').value.split('-');
            const fimPeriodoAquisitivo: Date = new Date(Number(val[0]), Number(val[1]) - 1, Number(val[2]));
            val = control.parent.get('inicioPeriodoAquisitivo').value.split('-');
            const inicioPeriodoAquisitivo: Date = new Date(Number(val[0]), Number(val[1]) - 1, Number(val[2]));
            if (control.parent.get('existeCalculoAnterior').value === true) {
                if (inicioUsufruto <= fimPeriodoAquisitivo) {
                    mensagem.push('A Data do início do usufruto deve ser maior que o fim de período aquisitivo !');
                }
                if (inicioUsufruto <= inicioPeriodoAquisitivo) {
                   mensagem.push('A Data de início do usufruto deve ser maior que a data de início do período aquisitivo !');
                }
            } else {
                if (inicioUsufruto <= inicioPeriodoAquisitivo) {
                    mensagem.push('A Data de início do usufruto deve ser maior que a data de início do período aquisitivo !');
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
    openModal3() {
        this.modalActions3.emit({action: 'modal', params: ['open']});
    }
    closeModal3() {
        this.modalActions3.emit({action: 'modal', params: ['close']});
    }
    protected encapsulaDatas(value: any, operacao: boolean): Date {
        if (operacao) {
            const a = value.split['/'];
            const dia = Number(a[0]);
            const mes = Number(a[1]) - 1;
            const ano = Number(a[2]);
            return new Date(ano, mes, dia);
        }else {
            return value as Date;
        }
    }
    verificaFormulario() {
        console.log(this.feriasForm.get('calcularTerceirizados').get('0').get('valorMovimentado'));
    }
}
