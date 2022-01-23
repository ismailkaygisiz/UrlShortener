import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// other
import { ToastrModule } from 'ngx-toastr';

// interceptors
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { RedirectPageComponent } from './pages/redirect-page/redirect-page.component';
import { ErrorComponent } from './pages/error/error.component';
import { FooterComponent } from './components/footer/footer.component';

// main

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RedirectPageComponent,
    ErrorComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      timeOut: 10000,
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
