import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FuncionariosService} from '../funcionarios.service';
import {MaterializeAction} from 'angular2-materialize';
import {Funcionario} from '../funcionario';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-cadastrar-terceirizado-component',
    templateUrl: './cadastrar-terceirizado.component.html',
    styleUrls: ['./cadastrar-terceirizado.component.scss']
})
export class CadastrarTerceirizadoComponent implements OnInit{
    id: number;
    terceirizadoForm: FormGroup;
    modalActions = new EventEmitter<string | MaterializeAction>();
    modalActions2 = new EventEmitter<string | MaterializeAction>();
    opcao: number;
    buttonDisabled = true;
    file: File;
    listaTerceirizados: Funcionario[];
    constructor(private fb: FormBuilder, private  terceirizadoService: FuncionariosService, private  route: ActivatedRoute, private router: Router) {

    }
    ngOnInit() {
        this.terceirizadoForm = this.fb.group({
            terceirizados: this.fb.array([this.createTerceirizado()])
        });
    }
    createTerceirizado(): FormGroup {
        return this.fb.group({
            nomeTerceirizado: new FormControl('', [Validators.required]),
            cpf: new FormControl('', [Validators.required]),
            ativo: new FormControl('S', [Validators.required])
        });
    }
    get terceirizados(): FormArray {
        return this.terceirizadoForm.get('terceirizados') as FormArray;
    }
    adicionaTerceirizadoForm(): void {
        this.terceirizados.push(this.fb.group({
            nomeTerceirizado: new FormControl('', [Validators.required]),
            cpf: new FormControl('', [Validators.required]),
            ativo: new FormControl('S', [Validators.required])
        }));
    }
    removeTerceirizado(i: number) {
        const control = <FormArray>this.terceirizadoForm.get('terceirizados');
        control.removeAt(i);
    }
    onChange(value: number) {
        this.opcao = value;
    }
    openModal() {
        this.modalActions.emit({action: 'modal', params: ['open']});
    }
    closeModal() {
        this.modalActions.emit({action: 'modal', params: ['close']});
        this.terceirizadoForm.get('nomeTerceirizado').setValue('');
        this.terceirizadoForm.get('nomeTerceirizado').reset();
        this.terceirizadoForm.get('cpf').setValue('');
        this.terceirizadoForm.get('cpf').reset();
        this.terceirizadoForm.get('ativo').reset();
        this.terceirizadoForm.reset();
    }
    openModal2() {
        this.modalActions2.emit({action: 'modal', params: ['open']});
    }
    closeModal2() {
        this.modalActions2.emit({action: 'modal', params: ['close']});
        window.location.reload();
    }
    uploadFile(event) {
        console.log(event);
        if (event.srcElement.files[0]) {
            console.log('passou aqui9');
            if (event.srcElement.files[0].name === 'modelo-cadastro-terceirizados.xlsx') {
                this.file = event.srcElement.files[0];
                this.buttonDisabled = false;
            }else {
                this.file = null;
                this.buttonDisabled = true;
            }
        }
    }
    uploadData() {
        console.log('eu');
        this.buttonDisabled = true;
        this.listaTerceirizados = [];
        if (this.file) {
            const fileReader = new FileReader();
            fileReader.onload = (e: any) => {
                const bstr: string = e.target.result;
                const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

                /* grab first sheet */
                const wsname: string = wb.SheetNames[0];
                const ws: XLSX.WorkSheet = wb.Sheets[wsname];

                /* save data */
                const data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
                console.log(data);
                data.forEach((result: any) => {
                    if (result[0]) {
                        const funcionario = new Funcionario();
                        funcionario.nome = result[0];
                        funcionario.cpf = result[1];
                        funcionario.ativo = result[2];
                        this.listaTerceirizados.push(funcionario);
                    }
                });
                this.listaTerceirizados.splice(0, 1);
            };
            fileReader.readAsBinaryString(this.file);
        }
    }
    cadastroTerceirizado() {
        if (this.terceirizadoForm.valid) {
           const funcionario = new Funcionario();
           funcionario.nome = this.terceirizadoForm.get('nomeTerceirizado').value;
           funcionario.cpf = this.terceirizadoForm.get('cpf').value;
           funcionario.ativo = this.terceirizadoForm.get('ativo').value;
           this.terceirizadoService.cadastraTerceirizado(funcionario).subscribe(res => {
               if (res.success) {
                  this.openModal();
               }else {
                   this.openModal2();
               }
           });
        }
    }
}
