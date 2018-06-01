import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterializeModule} from 'angular2-materialize';
import {TextMaskModule} from 'angular2-text-mask';
import {MaskDateDirective} from './_shared/mask-date.directive';
import {ConfigService} from './_shared/config.service';
import {UserService} from './users/user.service';
import {LoginComponent} from './users/login.component';
import {ComumComponent} from './layout/comum/comum.component';
import {FooterComponent} from './layout/footer.component';
import {LoadingComponent} from './layout/loading.component';
import {MenuComponent} from './layout/menu.component';
import {LoggedInGuard} from './users/logged-in.guard';
import {AppRoutingModule} from './app-routing.module';
import {IndicadoresComponent} from './indicadores/indicadores.component';
import {PageMenuComponent} from './_shared/page-menu/page-menu.component';
import {RelatorioComponent} from './layout/relatorio/relatorio.component';
import {InicioComponent} from './inicio/inicio.component';
import {RubricasComponent} from './rubricas/rubricas.component';
import {RubricasService} from './rubricas/rubricas.service';
import {TotalmensalComponent} from './totalMensal/totalmensal.component';
import {ContratosService} from './contratos/contratos.service';
import {ProfileGuard} from './users/profile.guard';
import {PercentuaisEstaticosComponent} from './percentuais-estaticos/percentuais-estaticos.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {CargoComponent} from './cargos/cargo.component';
import {CargoService} from './cargos/cargo.service';
import {ContratosComponent} from './contratos/contratos.component';
import {CpfPipe} from './_shared/cpf.pipe';
import {CnpjPipe} from './_shared/cnpj.pipe';
import {PercentualService} from './percentuais/percentual.service';
import {PercentuaisComponent} from './percentuais/percentuais.component';
import {DatePipe} from './_shared/date.pipe';
import {CargosDoContratoComponent} from './cargos/cargos.do.contrato.component';
import {ConvencoesColetivasComponent} from './convencoes-coletivas/convencoes.coletivas.component';
import {ConvencaoService} from './convencoes-coletivas/convencao.service';
import {VigenciaDosContratosComponent} from './vigencia-dos-contratos/vigencia.dos.contratos.component';
import {VigenciaService} from './vigencia-dos-contratos/vigencia.service';
import {FuncionariosComponent} from './funcionarios/funcionarios.component';
import {FuncionariosService} from './funcionarios/funcionarios.service';
import {AfirmativePipe} from './_shared/afirmative.pipe';
import {CargosDosFuncionariosComponent} from './cargos/cargos-dos-funcionarios/cargos.dos.funcionarios.component';
import {CadastroContratoComponent} from './contratos/cadastro-contrato/cadastro.contrato.component';
import {CadastroUsuarioComponent} from './usuarios/cadastro-usuario/cadastro-usuario.component';
import {CadastroUsuarioService} from './usuarios/cadastro-usuario/cadastro-usuario.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import {CadastroPercentuaisComponent} from './percentuais/cadastro-percentuais/cadastro-percentuais.component';
import {MaskPercentageDirective} from './_shared/mask-percentage.directive';
import {CadastrarRubricaComponent} from './rubricas/cadastrar-rubrica/cadastrar-rubrica.component';
import {CadastroCargosComponent} from './cargos/cadastro-cargos/cadastro-cargos.component';
import {VisualizaCargoCadastroComponent} from './cargos/cadastro-cargos/visualiza-cargo-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    MaskDateDirective,
    MaskPercentageDirective,
    LoginComponent,
    ComumComponent,
    FooterComponent,
    LoadingComponent,
    MenuComponent,
    IndicadoresComponent,
    PageMenuComponent,
    RelatorioComponent,
    InicioComponent,
    RubricasComponent,
    TotalmensalComponent,
    PercentuaisEstaticosComponent,
    UsuariosComponent,
    CargoComponent,
    ContratosComponent,
    CpfPipe,
    CnpjPipe,
    DatePipe,
    AfirmativePipe,
    PercentuaisComponent,
    CargosDoContratoComponent,
    ConvencoesColetivasComponent,
    VigenciaDosContratosComponent,
    FuncionariosComponent,
    CargosDosFuncionariosComponent,
    CadastroContratoComponent,
    CadastroUsuarioComponent,
    CadastroPercentuaisComponent,
    CadastrarRubricaComponent,
    CadastroCargosComponent,
    VisualizaCargoCadastroComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    TextMaskModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
  ],
  providers: [
    ConfigService,
    UserService,
    LoggedInGuard,
    ProfileGuard,
    RubricasService,
    ContratosService,
    CargoService,
    PercentualService,
    ConvencaoService,
    VigenciaService,
    FuncionariosService,
    CadastroUsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
