import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NotasService } from './services/notas.service';
import { EditNotaPage } from './pages/edit-nota/edit-nota.page';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthService } from './services/auth.service';
import { LoadingService} from './services/loading.service';
import { VibrationService } from './services/vibration.service';
import { Vibration} from '@ionic-native/vibration/ngx';
import { Shake } from '@ionic-native/shake/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { ThemeService} from './services/theme.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Globalization } from '@ionic-native/globalization/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent,EditNotaPage],
  entryComponents: [EditNotaPage],
  imports: [
    HttpClientModule,
    BrowserModule, 
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NotasService,
    NativeStorage,
    GooglePlus,
    AuthService,
    LoadingService,
    Camera,
    Vibration,
    Geolocation,
    VibrationService,
    ThemeService,
    Shake,
    Globalization,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
