import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from '../_shared/config.service';
import { UserService } from '../users/user.service';

@Component(
{
  selector: 'app-menu',
  templateUrl: './menu.component.html'
}
)
export class MenuComponent {
  links = [
    {url: '/inicio', label: 'Início', icon: 'home', child: []},
    {url: '/administracao', label: 'Administração', icon: 'group', child: [
            {url: '/rubricas', label: 'Rubricas', icon: ''},
            {url: '/usuarios', label: 'Usuários', icon: ''},
            {url: '/cargos', label: 'Cargos', icon: ''}
          ]
    },
    {url: '/gerenciar', label: 'Gerenciar Contrato', icon: 'storage', child: [
            {url: '/contratos', label: 'Contratos', icon: ''},
            {url: '/percentuais', label: 'Percentuais', icon: ''},
            {url: '/cargosContrato', label: 'Cargos do Contrato', icon: ''},
            {url: '/convencoes', label: 'Convenções Coletivas', icon: ''},
            {url: '/funcionarios', label: 'Funcionários', icon: ''},
            {url: '/cargosFuncionarios', label: 'Cargos dos Funcionários', icon: ''},
            {url: '/vigencias', label: 'Vigências dos Contratos', icon: ''}
          ]
    },
    {url: '/resgate', label: 'Resgate', icon: 'attach_money', child: [
                {url: '/ferias', label: 'Férias', icon: ''},
                {url: '/decTer', label: 'Décimo Terceiro', icon: ''},
                {url: '/rescisao', label: 'Rescisão', icon: ''}
            ]
    },
    {url: '/totalmensal', label: 'Total Mensal a Reter', icon: 'event', child: []},
    {url: '/saldoconta', label: 'Saldo Conta Vinculada', icon: 'functions', child: []}
    ];
  constructor(
    private config: ConfigService,
    private userService: UserService,
    private router: Router
  ) { }
  onInit() {
      const is_menu = localStorage.getItem('is_menu');
    }
    logout() {
    // this.userService.logout();
    localStorage.removeItem('is_menu');
    this.router.navigate(['login']);
    }
    menuUser() {
      /*
		$(document).ready(function()
		{
			$("#modalUser").modal('open');
		});
		*/
    }
}
