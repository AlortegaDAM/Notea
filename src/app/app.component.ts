import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  languages:string[]=[];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translateService: TranslateService,
    private geoL:Geolocation,
    private authS:AuthService
    
  ) {
    this.initializeApp();
    
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    this.translateService.addLangs(['en','en','fr']);
    this.languages=this.translateService.getLangs();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authS.init();

      this.checkDarkTheme();
    });
  }
  checkDarkTheme(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches){
      document.body.classList.toggle('dark');
    }
  }

  changeLang(lang:string){
    this.translateService.use(lang);
  }
  public getGeolocation(){
    this.geoL.getCurrentPosition()
    .then((geoposition:Geoposition)=>{
      let latitude:number = geoposition.coords.latitude;
      let longitude:number = geoposition.coords.longitude;
      //this.toastS.presentToast("Latitud: "+latitude+", Longitud: "+longitude, "myToast", 2000, "primary");
    })
  }


}
