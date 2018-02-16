import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    MaskDateDirective,
    LoginComponent,
    ComumComponent,
    FooterComponent,
    LoadingComponent,
    MenuComponent,
    IndicadoresComponent,
    PageMenuComponent,
    RelatorioComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    TextMaskModule,
    AppRoutingModule
  ],
  providers: [
    ConfigService,
    UserService,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
