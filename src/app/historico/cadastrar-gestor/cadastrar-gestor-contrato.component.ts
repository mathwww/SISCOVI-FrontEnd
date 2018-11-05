import {Component, OnInit} from '@angular/core';
import {HistoricoService} from '../historico.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ContratosService} from '../../contratos/contratos.service';
import {Contrato} from '../../contratos/contrato';
import {UserService} from '../../users/user.service';
import {Usuario} from '../../usuarios/usuario';

@Component({
    selector: 'app-cadastrar-gestor-contrato-component',
    templateUrl: './cadastrar-gestor-contrato.component.html'
})
export class CadastrarGestorContratoComponent implements OnInit {
    gestorContratoForm: FormGroup;
    contratos: Contrato[];
    usuarios: Usuario[];
    constructor(private histService: HistoricoService, private fb: FormBuilder, private contratoService: ContratosService, private usuarioService: UserService) {
        this.contratoService.getContratosDoUsuario().subscribe(res => {
            this.contratos = res;
        });
        this.usuarioService.getUsuarios().subscribe(res => {
            this.usuarios = res;
        });
    }
    ngOnInit() {
        this.gestorContratoForm = this.fb.group({
            contrato: new FormControl(),
            servidor: new FormControl(),
            perfil: new FormControl(),
            dataInicio: new FormControl()
        });
    }
}
