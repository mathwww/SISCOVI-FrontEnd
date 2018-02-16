import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComumComponent} from './layout/comum/comum.component';
import {LoginComponent} from './users/login.component';
import {LoggedInGuard} from './users/logged-in.guard';
import {IndicadoresComponent} from './indicadores/indicadores.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'indicadores'},
  {path: 're' , component: IndicadoresComponent, canActivate: [LoggedInGuard],
    children: []
  },
  {path: '', component: ComumComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'indicadores', component: IndicadoresComponent, canActivate: [LoggedInGuard]},
      {path: 'rubricas', component: IndicadoresComponent, canActivate: [LoggedInGuard]},
      {path: 'usuarios', component: IndicadoresComponent, canActivate: [LoggedInGuard]},
      {path: 'cargos', component: IndicadoresComponent, canActivate: [LoggedInGuard]},
      {path: 'gerenciar', component: IndicadoresComponent, canActivate: [LoggedInGuard]},
      {path: 'contratos', component: IndicadoresComponent, canActivate: [LoggedInGuard]},
      {path: 'percentuais', component: IndicadoresComponent, canActivate: [LoggedInGuard]},
      {path: 'cargosContrato', component: IndicadoresComponent, canActivate: [LoggedInGuard]},
      {path: 'convencoes', component: IndicadoresComponent, canActivate: [LoggedInGuard]},
      {path: 'funcionarios', component: IndicadoresComponent, canActivate: [LoggedInGuard]},
      {path: 'cargosFuncionarios', component: IndicadoresComponent, canActivate: [LoggedInGuard]},
      {path: 'vigencias', component: IndicadoresComponent, canActivate: [LoggedInGuard]},
    ]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
