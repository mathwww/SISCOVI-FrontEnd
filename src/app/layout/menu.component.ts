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
    {url: '/', label: 'Administração', icon: 'group', child: [
            {url: '/rubricas', label: 'Rubricas', icon: 'assignment'},
            {url: '/usuarios', label: 'Usuários', icon: 'people'},
            {url: '/cargos', label: 'Cargos', icon: 'portrait'}
          ]
    },
    {url: '/', label: 'Gerenciar Contrato', icon: 'storage', child: [
            {url: '/contratos', label: 'Contratos', icon: 'description'},
            {url: '/percentuais', label: 'Percentuais', icon: 'iso'},
            {url: '/cargosContrato', label: 'Cargos do Contrato', icon: 'business_center'},
            {url: '/convencoes', label: 'Convenções Coletivas', icon: 'trending_up'},
            {url: '/funcionarios', label: 'Funcionários', icon: 'assignment_ind'},
            {url: '/cargosFuncionarios', label: 'Cargos dos Funcionários', icon: 'folder_shared'},
            {url: '/vigencias', label: 'Vigências dos Contratos', icon: 'format_list_numbered'}
          ]
    },
    {url: '/', label: 'Resgate', icon: 'attach_money', child: [
                {url: '/ferias', label: 'Férias', icon: 'perm_contact_calendar'},
                {url: '/decTer', label: 'Décimo Terceiro', icon: 'card_membership'},
                {url: '/rescisao', label: 'Rescisão', icon: 'broken_image'}
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
