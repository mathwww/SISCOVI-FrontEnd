import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContratosComponent} from '../contratos.component';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CargoService} from '../../cargos/cargo.service';
import {Cargo} from '../../cargos/cargo';
import {ContratosService} from '../contratos.service';

@Component({
  selector: 'app-cadastro-contrato',
  templateUrl: './cadastro.contrato.component.html',
  styleUrls: ['./cadastro.contrato.component.scss']
})
export class CadastroContratoComponent implements OnInit {

    router: Router;
    carSer: CargoService;
    cargosCadastrados: Cargo[];
    myForm: FormGroup;
    myForm2: FormGroup;
    fb: FormBuilder;
    fb1: FormBuilder;
    contratoService: ContratosService;
    dataInicio = '';
    meses =  [
        {valor: 1, mes: 'Janeiro'},
        {valor: 2, mes: 'Fevereiro'},
        {valor: 3, mes: 'Março'},
        {valor: 4, mes: 'Abril'},
        {valor: 5, mes: 'Maio'},
        {valor: 6, mes: 'Junho'},
        {valor: 7, mes: 'Julho'},
        {valor: 8, mes: 'Agosto'},
        {valor: 9, mes: 'Setembro'},
        {valor: 10, mes: 'Outubro'},
        {valor: 11, mes: 'Novembro'},
        {valor: 12, mes: 'Dezembro'}
    ];
    constructor(router: Router, carSer: CargoService, fb: FormBuilder, fb1: FormBuilder, contratoService: ContratosService) {
        this.router = router;
        this.fb = fb;
        this.fb1 = fb1;
        this.contratoService = contratoService;
        this.carSer = carSer;
        this.carSer.getAllCargos().subscribe(res => {
            this.cargosCadastrados = res;
            this.initCargos();
        });
    }
    ngOnInit() {
        this.myForm2 = this.fb1.group({
            inicioVigencia: new FormControl('', [Validators.required]),
            fimVigencia: new FormControl('', [Validators.required, this.myDateValidator]),
            assinatura: new FormControl('', [Validators.required, this.myDateValidator]),
            nomeGestor: new FormControl('', [Validators.required, this.nameValidator]),
            nomeEmpresa: new FormControl('', [Validators.required, this.nameValidator]),
            cnpj: new FormControl('', [Validators.required]),
            ativo: new FormControl('SIM', [Validators.required]),
            objeto: new FormControl(''),
            percentualFerias: new FormControl('', [Validators.required]),
            percentualDecimoTerceiro: new FormControl('', [Validators.required]),
            percentualIncidencia: new FormControl('', [Validators.required, this.percentualValidator]),
            numeroContrato: new FormControl('', [Validators.required])
        });
        this.myForm = this.fb.group({
            cargos: this.fb.array([])
        });
        this.adicionaCargo();
        this.carSer.getAllCargos().subscribe(res => {
            this.cargosCadastrados = res;
            this.initCargos();
        });
        this.contratoService.formValido = this.myForm.valid && this.myForm2.valid;
    }
    initCargos() {
        return this.fb.group({
            nome: new FormControl('', [Validators.required]),
            remuneracao: new FormControl('', [Validators.required]),
            descricao: new FormControl(''),
            dia: new FormControl('', [Validators.required]),
            mes: new FormControl('', [Validators.required])
        });
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
    public myDateValidator(control: AbstractControl): {[key: string]: any} {
        const val = control.value;
        const mensagem = [];
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
        }
        return (mensagem.length > 0) ? {'mensagem': [mensagem]} : null;
    }
    public percentualValidator(control: AbstractControl): {[key: string]: any} {
        const val = control.value.split('%')[0];
        const mensagem = [];
        if (Number(val.replace(',', '.')) === 0) {
            mensagem.push('Digite um valor para o percentual de incidência, este valor tende a ser 36,8 ou 35,6');
        }
        return (mensagem.length > 0) ? {'mensagem:': [mensagem]} : null;
    }
    ehValido() {
        console.log(this.myForm.valid);
        console.log(this.myForm2.valid);
    }
    formArrayLenght() {
        const control = <FormArray>this.myForm.controls.cargos;
        return control.length;
    }
    getFormArrayItems() {
        const control = <FormArray>this.myForm.controls.cargos;
        return control.controls;
    }
    public nameValidator(control: AbstractControl): {[key: string]: any} {
        const exp = new RegExp(/[a-zA-Z-\u00C0-\u00FF]+$/);
        const mensagem = [];
        if (!exp.test(control.value)) {
            mensagem.push('O nome deve conter apenas letras');
        }
        return (mensagem.length > 0) ? {'mensagem': [mensagem]} : null;
    }
}
