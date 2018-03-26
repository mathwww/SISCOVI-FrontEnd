import {Component} from '@angular/core';
import {UserService} from '../users/user.service';
import {Usuario} from './usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: 'usuarios.component.html',
  styleUrls: ['usuarios.component.scss']
})
export class UsuariosComponent {
  usuarios: Usuario[] = [];
  constructor(userService: UserService) {
    userService.getUsuarios().subscribe(res => {
      this.usuarios = res;
    });
  }
}
