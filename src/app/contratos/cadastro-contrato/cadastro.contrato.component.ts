import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContratosComponent} from '../contratos.component';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CargoService} from '../../cargos/cargo.service';
import {Cargo} from '../../cargos/cargo';

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
    // fb2: FormBuilder;
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
    constructor(router: Router, carSer: CargoService, fb: FormBuilder, fb1: FormBuilder) {
        this.router = router;
        this.fb = fb;
        this.fb1 = fb1;
        // this.fb2 = fb2;
        this.carSer = carSer;
        this.carSer.getAllCargos().subscribe(res => {
            this.cargosCadastrados = res;
            this.initCargos();
        });
    }
    ngOnInit() {
        this.myForm2 = this.fb1.group({
            inicioVigencia: [ '', Validators.compose([Validators.required, this.myDateValidator])],
            fimVigencia: ['', Validators.compose([Validators.required, this.myDateValidator])],
            assinatura: ['', Validators.compose([Validators.required, this.myDateValidator])]
        });
        this.myForm = this.fb.group({
            cargos: this.fb.array([])
        });
        this.adicionaCargo();
        this.carSer.getAllCargos().subscribe(res => {
            this.cargosCadastrados = res;
            this.initCargos();
        });
    }
    initCargos() {
        return this.fb.group({
            nome: ['', Validators.required],
            remuneracao: [''],
            descricao: [''],
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
}
