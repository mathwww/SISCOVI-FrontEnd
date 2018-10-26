import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FuncionariosService} from '../funcionarios.service';
import {MaterializeAction} from 'angular2-materialize';
import {Funcionario} from '../funcionario';

@Component({
    selector: 'app-cadastrar-terceirizado-component',
    templateUrl: './cadastrar-terceirizado.component.html',
    styleUrls: ['../funcionarios.components.scss']
})
export class CadastrarTerceirizadoComponent {
    id: number;
    terceirizadoForm: FormGroup;
    modalActions = new EventEmitter<string | MaterializeAction>();
    constructor(private fb: FormBuilder, private  terceirizadoService: FuncionariosService, private  route: ActivatedRoute, private router: Router) {
    }
}
